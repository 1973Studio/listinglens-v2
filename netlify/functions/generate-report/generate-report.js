// ============================================================
// LISTING LENS — GENERATE REPORT (Netlify Function)
// Assembles prompt layers, sends screenshots to Claude API,
// returns structured JSON report
// ============================================================

const fs = require('fs');
const path = require('path');

// Prompt files live alongside this function
const PROMPTS_DIR = path.join(__dirname, 'prompts');

// Read a prompt file and return its contents
function readPrompt(filename) {
  const filepath = path.join(PROMPTS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`Prompt file not found: ${filename}`);
  }
  return fs.readFileSync(filepath, 'utf-8');
}

// Get the country layer content
function getCountryLayer(country) {
  if (country === 'Australia') {
    return readPrompt('country-australia.md');
  }
  // For all other countries, use the universal template with country injected
  const template = readPrompt('country-universal.md');
  return template.replace(/\{COUNTRY\}/g, country);
}

// Get the category layer content
function getCategoryLayer(category) {
  // Map frontend category values to filenames
  const categoryMap = {
    'vehicle': 'category-vehicle.md',
    'property': 'category-property.md',
    'motorcycle': 'category-motorcycle.md',
    'boat': 'category-boat.md',
    'watch': 'category-watch.md',
    'electronics': 'category-electronics.md',
    'jewellery': 'category-jewellery.md',
    'instrument': 'category-instrument.md',
    'something-else': 'category-something-else.md',
  };

  const filename = categoryMap[category];
  if (!filename) {
    // Default to something-else for unrecognised categories
    return readPrompt('category-something-else.md');
  }
  return readPrompt(filename);
}

// Assemble the full system prompt from three layers
function assembleSystemPrompt(country, category) {
  const master = readPrompt('master-v3.md');
  const countryLayer = getCountryLayer(country);
  const categoryLayer = getCategoryLayer(category);

  return `${master}\n\n---\n\n## COUNTRY-SPECIFIC CONTEXT\n\n${countryLayer}\n\n---\n\n## CATEGORY-SPECIFIC INVESTIGATION\n\n${categoryLayer}`;
}

// Clean AI response — strip markdown fences, citation markers, etc.
function cleanResponse(text) {
  let cleaned = text;

  // Strip markdown code fences (```json ... ```)
  cleaned = cleaned.replace(/^```json\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/i, '');
  cleaned = cleaned.replace(/^```\s*\n?/, '');
  cleaned = cleaned.replace(/\n?```\s*$/, '');

  // Strip DeepSeek-style citation markers like [1], [2]
  cleaned = cleaned.replace(/\[\d+\]/g, '');

  // Strip any leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

// Build the user message content array with screenshots
function buildUserContent(screenshots) {
  const content = [];

  screenshots.forEach((screenshot, index) => {
    // Each screenshot is { data: base64string, mediaType: 'image/png' }
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: screenshot.mediaType || 'image/png',
        data: screenshot.data,
      },
    });
  });

  // Add the instruction text after all images
  content.push({
    type: 'text',
    text: 'Analyse this listing and produce the buyer intelligence report as specified in your system prompt. Return ONLY the JSON object — no markdown, no commentary, no code fences.',
  });

  return content;
}

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { screenshots, country, category, paymentIntentId } = body;

    // Validate inputs
    if (!screenshots || !Array.isArray(screenshots) || screenshots.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'At least one screenshot is required' }),
      };
    }

    if (screenshots.length > 3) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Maximum 3 screenshots allowed' }),
      };
    }

    if (!country || !category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Country and category are required' }),
      };
    }

    // TODO: In production, verify the paymentIntentId is valid and paid
    // by calling Airwallex's Retrieve PaymentIntent endpoint.
    // For beta testing, this check is skipped.
    // if (paymentIntentId) {
    //   const verified = await verifyPayment(paymentIntentId);
    //   if (!verified) {
    //     return { statusCode: 402, headers, body: JSON.stringify({ error: 'Payment not confirmed' }) };
    //   }
    // }

    // Assemble the system prompt
    const systemPrompt = assembleSystemPrompt(country, category);

    // Build user content with screenshots
    const userContent = buildUserContent(screenshots);

    console.log(`Generating report: country=${country}, category=${category}, screenshots=${screenshots.length}`);

    // Call Claude API with web search enabled
    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8000,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: userContent,
        }],
      }),
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      console.error(`Claude API error ${apiResponse.status}:`, errText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: 'Report generation failed. Please try again.',
          detail: process.env.NODE_ENV === 'development' ? errText : undefined,
        }),
      };
    }

    const apiData = await apiResponse.json();

    // Extract the text blocks from the response
    // After web searches complete, the final text block contains the JSON report
    const textBlocks = apiData.content.filter(block => block.type === 'text');

    if (textBlocks.length === 0) {
      console.error('No text blocks in API response:', JSON.stringify(apiData.content.map(b => b.type)));
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'No report content generated. Please try again.' }),
      };
    }

    // Use the last text block — after web searches complete,
    // the final text block contains the assembled report JSON
    const rawReport = textBlocks[textBlocks.length - 1].text;
    const cleanedReport = cleanResponse(rawReport);

    // Parse to validate it's proper JSON, then return
    let reportJson;
    try {
      reportJson = JSON.parse(cleanedReport);
    } catch (parseError) {
      console.error('JSON parse error. Raw response:', rawReport.substring(0, 500));

      // Try to extract JSON from the response if it's wrapped in other text
      const jsonMatch = cleanedReport.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          reportJson = JSON.parse(jsonMatch[0]);
        } catch (e) {
          return {
            statusCode: 502,
            headers,
            body: JSON.stringify({
              error: 'Report format error. Please try again.',
              rawPreview: process.env.NODE_ENV === 'development' ? rawReport.substring(0, 200) : undefined,
            }),
          };
        }
      } else {
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({ error: 'Report format error. Please try again.' }),
        };
      }
    }

    console.log(`Report generated successfully for ${category} in ${country}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        report: reportJson,
        meta: {
          country,
          category,
          model: 'claude-sonnet-4-5-20250929',
          generatedAt: new Date().toISOString(),
          usage: apiData.usage || null,
        },
      }),
    };

  } catch (error) {
    console.error('generate-report error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
