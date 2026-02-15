// ============================================================
// LISTING LENS — generate-report Netlify Function
// ============================================================
// Receives screenshots + country + category from the dashboard,
// assembles the prompt layers, calls the Anthropic API with
// web search enabled, and returns structured JSON report.
// ============================================================

const fs = require('fs');
const path = require('path');

// Prompt files live alongside this function in /prompts/
const PROMPTS_DIR = path.join(__dirname, 'prompts');

// -----------------------------------------------------------
// Helper: Read a prompt file from the prompts directory
// -----------------------------------------------------------
function readPrompt(filename) {
  const filePath = path.join(PROMPTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Prompt file not found: ${filename}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

// -----------------------------------------------------------
// Helper: Assemble the three-layer system prompt
// -----------------------------------------------------------
function assembleSystemPrompt(country, category) {
  // 1. Master prompt (always included)
  const master = readPrompt('master-v3.md');

  // 2. Country layer
  let countryLayer;
  if (country.toLowerCase() === 'australia') {
    countryLayer = readPrompt('country-australia.md');
  } else {
    // Universal template with country name injected
    const template = readPrompt('country-universal.md');
    countryLayer = template.replace(/\[COUNTRY\]/g, country);
  }

  // 3. Category layer
  // Normalise "Something Else" → "something-else"
  const safeCategoryFile = `category-${category.toLowerCase().replace(/\s+/g, '-')}.md`;
  const categoryLayer = readPrompt(safeCategoryFile);

  return `${master}\n\n---\n\n${countryLayer}\n\n---\n\n${categoryLayer}`;
}

// -----------------------------------------------------------
// Helper: Build the messages array with screenshot images
// -----------------------------------------------------------
function buildMessages(screenshots) {
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

  // Final text instruction after all images
  content.push({
    type: 'text',
    text: 'Analyse this listing and produce the buyer intelligence report as specified.',
  });

  return [{ role: 'user', content }];
}

// -----------------------------------------------------------
// Helper: Clean the AI response into valid JSON
// -----------------------------------------------------------
function cleanResponse(raw) {
  let cleaned = raw;

  // Strip markdown code fences: ```json ... ``` or ``` ... ```
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```$/i, '');

  // Strip DeepSeek-style citation markers like 【4:0†source】
  cleaned = cleaned.replace(/【[^】]*】/g, '');

  // Strip any leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

// -----------------------------------------------------------
// Validate the incoming request body
// -----------------------------------------------------------
function validateRequest(body) {
  const errors = [];

  if (!body.screenshots || !Array.isArray(body.screenshots) || body.screenshots.length === 0) {
    errors.push('At least one screenshot is required.');
  }

  if (body.screenshots && body.screenshots.length > 3) {
    errors.push('Maximum 3 screenshots allowed.');
  }

  if (!body.country || typeof body.country !== 'string') {
    errors.push('Country selection is required.');
  }

  if (!body.category || typeof body.category !== 'string') {
    errors.push('Category selection is required.');
  }

  // Validate category is one of the known values
  const validCategories = [
    'vehicle', 'property', 'motorcycle', 'boat',
    'watch', 'electronics', 'jewellery', 'instrument', 'something-else',
  ];
  if (body.category && !validCategories.includes(body.category.toLowerCase().replace(/\s+/g, '-'))) {
    errors.push(`Invalid category: ${body.category}`);
  }

  // Check screenshot sizes (base64 ~1.37x original, cap at ~10MB per image)
  if (body.screenshots) {
    body.screenshots.forEach((s, i) => {
      if (!s.data || typeof s.data !== 'string') {
        errors.push(`Screenshot ${i + 1} is missing base64 data.`);
      } else if (s.data.length > 14_000_000) {
        errors.push(`Screenshot ${i + 1} exceeds maximum size (~10MB).`);
      }
    });
  }

  return errors;
}

// -----------------------------------------------------------
// MAIN HANDLER
// -----------------------------------------------------------
exports.handler = async (event) => {
  // CORS headers for the dashboard
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

  // POST only
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // -------------------------------------------------------
    // 1. Parse and validate the request
    // -------------------------------------------------------
    const body = JSON.parse(event.body);
    const errors = validateRequest(body);

    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Validation failed', details: errors }),
      };
    }

    const { screenshots, country, category } = body;

    // -------------------------------------------------------
    // 2. Assemble the system prompt from three layers
    // -------------------------------------------------------
    const systemPrompt = assembleSystemPrompt(country, category);

    // -------------------------------------------------------
    // 3. Build the messages array with images
    // -------------------------------------------------------
    const messages = buildMessages(screenshots);

    // -------------------------------------------------------
    // 4. Call the Anthropic API
    // -------------------------------------------------------
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set.');
    }

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8000,
        system: systemPrompt,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages,
      }),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error('Anthropic API error:', apiResponse.status, errorBody);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: 'AI analysis failed',
          detail: `API returned ${apiResponse.status}`,
        }),
      };
    }

    // -------------------------------------------------------
    // 5. Extract and clean the response
    // -------------------------------------------------------
    const apiData = await apiResponse.json();

    // Claude returns content blocks — find all text blocks and join them.
    // When web_search is enabled, there may be tool_use and tool_result
    // blocks interspersed. We only want the final text output.
    const textBlocks = apiData.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text);

    if (textBlocks.length === 0) {
      throw new Error('No text content in API response.');
    }

    // Use the last text block — after web searches complete,
    // the final text block contains the assembled report JSON
    const rawReport = textBlocks[textBlocks.length - 1];
    const cleanedReport = cleanResponse(rawReport);

    // Parse to validate it's proper JSON, then return
    let reportJson;
    try {
      reportJson = JSON.parse(cleanedReport);
    } catch (parseError) {
      console.error('JSON parse failed. Raw output:', rawReport);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: 'Report generation failed',
          detail: 'AI response was not valid JSON. Please try again.',
          raw: cleanedReport.substring(0, 500), // First 500 chars for debugging
        }),
      };
    }

    // -------------------------------------------------------
    // 6. Return the report to the dashboard
    // -------------------------------------------------------
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(reportJson),
    };

  } catch (err) {
    console.error('generate-report error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        detail: err.message,
      }),
    };
  }
};
