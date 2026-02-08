'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [darkMode, setDarkMode] = useState(false);
  
  const bg = darkMode ? '#09090b' : '#fafaf9';
  const text = darkMode ? '#fafafa' : '#18181b';
  const cardBg = darkMode ? '#18181b' : '#ffffff';
  const border = darkMode ? '#27272a' : '#e7e5e4';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text, padding: 24 }}>
      
      {/* HEADER */}
      <header style={{ marginBottom: 48 }}>
        <a href="/" style={{ textDecoration: 'none', color: text }}>
          <h1 style={{ fontSize: 24, fontWeight: 900 }}>LISTING LENS</h1>
        </a>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginTop: 8 }}>
          {darkMode ? '☀️' : '🌙'} Toggle Dark Mode
        </button>
      </header>

      {/* HERO */}
      <section style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1 style={{ fontSize: 48, fontWeight: 900 }}>See What Buyers Miss</h1>
        <p style={{ fontSize: 18, marginTop: 16 }}>
          Real listings. Hidden intelligence. Each analysis reveals what you can't see in the screenshot.
        </p>
      </section>

      {/* EXAMPLE 1: JEEP */}
      <section id="jeep" style={{ marginBottom: 80 }}>
        <div style={{ padding: 24, backgroundColor: cardBg, border: '2px solid ' + border, borderRadius: 12 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🚗</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, display: 'inline', marginLeft: 12 }}>
              2021 Jeep Gladiator
            </h2>
            <p style={{ fontSize: 14, marginTop: 4 }}>Carsales.com.au • $51,950</p>
          </div>

          {/* Screenshot */}
          <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid ' + border }}>
            <img 
              src="/Jeep-Screenshot.jpg" 
              alt="Jeep Gladiator listing"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <p style={{ fontSize: 14, marginBottom: 16 }}>
            <strong>What you CAN see:</strong> Price, photos, 51,000km, automatic, petrol, private sale
          </p>

          <div style={{ padding: 16, backgroundColor: '#fef3c7', border: '4px solid #f59e0b', borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#92400e' }}>
              ⚠️ What you CAN'T see (Critical Research):
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: '#78350f' }}>
              <li><strong>Check for modifications:</strong> If this vehicle has been lifted or modified (check with seller), VIC requires VSI engineering certificate for lifts &gt;50mm. Ask: "Do you have VSI cert?" Uncertified = uninsurable.</li>
              <li><strong>Verify recall status:</strong> Check your specific VIN at vehiclerecalls.gov.au before purchase. Ask seller: "Have you checked for recalls and are they all completed?" Past Gladiator recalls have included bumper compliance issues.</li>
              <li><strong>On-road costs not shown:</strong> Advertised $51,950 excludes stamp duty (~$2,900 in VIC), registration transfer (~$250), RWC (~$200). Calculate YOUR total based on YOUR state.</li>
              <li><strong>Aftermarket considerations:</strong> If modifications present (larger tires, suspension, etc.), typical costs: 35" tires $400-$600 each vs $200-$300 stock, more frequent replacement.</li>
              <li><strong>Insurance concern:</strong> Get quotes BEFORE buying. Modified vehicles often refused or 50-100% premium. Some insurers won't cover lifted vehicles at all.</li>
              <li><strong>Resale reality:</strong> Modified vehicles have smaller buyer pool. Banks often refuse loans on modified 4WDs. Check recent sold prices for modified examples, not stock.</li>
            </ul>
          </div>

          <div style={{ padding: 16, backgroundColor: '#e0e7ff', borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1e3a8a' }}>
              💬 What Owners Say (Forums & Reviews):
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#1e40af', margin: 0 }}>
              <strong>Common praise:</strong> Off-road capability, truck bed versatility, Jeep brand appeal<br/>
              <strong>Common complaints:</strong> Harsh ride on highway, road noise at speed, poor fuel economy (real-world 13-15L/100km vs 11L claimed)<br/>
              <strong>Known issues (2021 model):</strong> Fuel pump recalls, airbag sensor issues, transmission hesitation reported by some owners<br/>
              <strong>Modification feedback:</strong> Lifted Gladiators report increased body roll, harder highway driving, reduced towing stability<br/>
              <em style={{ fontSize: 13, marginTop: 8, display: 'block' }}>Sources: Australian 4x4 forums, ProductReview.com.au, owner groups</em>
            </p>
          </div>

          <div style={{ padding: 16, backgroundColor: '#d1fae5', borderRadius: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#065f46' }}>
              💰 Research before offering: Check similar modified examples (not stock), verify engineering certs, get insurance quotes with mod details, confirm YOUR bank will finance it.
            </p>
          </div>
        </div>
      </section>

      {/* EXAMPLE 2: APARTMENT */}
      <section id="apartment" style={{ marginBottom: 80 }}>
        <div style={{ padding: 24, backgroundColor: cardBg, border: '2px solid ' + border, borderRadius: 12 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🏢</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, display: 'inline', marginLeft: 12 }}>
              Carlton Apartment
            </h2>
            <p style={{ fontSize: 14, marginTop: 4 }}>Realestate.com.au • $1.8M-$1.95M</p>
          </div>

          {/* Screenshot */}
          <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid ' + border }}>
            <img 
              src="/apartment-screenshot.jpg" 
              alt="Carlton apartment listing"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <p style={{ fontSize: 14, marginBottom: 16 }}>
            <strong>What you CAN see:</strong> 3 bed, 2 bath, 3 car, 230m², Carlton location, $17,322/month repayments shown
          </p>

          <div style={{ padding: 16, backgroundColor: '#fef3c7', border: '4px solid #f59e0b', borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#92400e' }}>
              ⚠️ What you CAN'T see (Critical Questions):
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: '#78350f' }}>
              <li><strong>Repayment calculation unclear:</strong> $17,322/month shown — what loan term? What rate? A 30-year loan at 6.5% would be ~$11,850/month. Verify with YOUR bank.</li>
              <li><strong>Body corporate fees unknown:</strong> Not disclosed in listing. For a 230m² premium Carlton apartment, expect $15K-$25K/year minimum. Ask agent for last 3 years of fees.</li>
              <li><strong>Hidden ongoing costs:</strong> Council rates (~$5K/year), water rates (~$1.5K/year), building insurance — none disclosed.</li>
              <li><strong>Wide price range:</strong> $150K gap ($1.8M-$1.95M) suggests vendor uncertainty or soft market.</li>
              <li><strong>Size concern for resale:</strong> 230m² is very large for an apartment. Check recent comparable sales for similar-sized units in Carlton.</li>
            </ul>
          </div>

          <div style={{ padding: 16, backgroundColor: '#e0e7ff', borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1e3a8a' }}>
              🏘️ Living in Carlton (Suburb Reality):
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#1e40af', margin: 0 }}>
              <strong>Lifestyle:</strong> Inner-city living, walking distance to Melbourne CBD, vibrant cafe/restaurant scene<br/>
              <strong>Noise reality:</strong> High foot traffic area, bars/restaurants open late, street noise common (check building's noise insulation)<br/>
              <strong>Parking:</strong> Resident permit parking zones, waitlists common, visitor parking limited<br/>
              <strong>Schools:</strong> Zoned for Carlton Primary, close to University High School<br/>
              <strong>Transport:</strong> Tram routes 1, 96 (frequent delays peak hour), 15min to CBD<br/>
              <strong>Safety:</strong> Check Crime Statistics Agency VIC for recent property crime rates in Carlton<br/>
              <em style={{ fontSize: 13, marginTop: 8, display: 'block' }}>Sources: Domain suburb profile, r/melbourne, local council data</em>
            </p>
          </div>

          <div style={{ padding: 16, backgroundColor: '#d1fae5', borderRadius: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#065f46' }}>
              💰 Questions to ask: (1) What are actual body corp fees? (2) Any special levies planned? (3) What loan term is $17K/month based on? (4) Recent comparable sales?
            </p>
          </div>
        </div>
      </section>

      {/* EXAMPLE 3: NINTENDO */}
      <section id="nintendo" style={{ marginBottom: 80 }}>
        <div style={{ padding: 24, backgroundColor: cardBg, border: '2px solid ' + border, borderRadius: 12 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>🎮</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, display: 'inline', marginLeft: 12 }}>
              Nintendo 64 Console
            </h2>
            <p style={{ fontSize: 14, marginTop: 4 }}>eBay.com • US $88.00 + $108.64 shipping</p>
          </div>

          {/* Screenshot */}
          <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid ' + border }}>
            <img 
              src="/console-screenshot.jpg" 
              alt="Nintendo 64 listing"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <p style={{ fontSize: 14, marginBottom: 16 }}>
            <strong>What you CAN see:</strong> US $88 + shipping, used condition, 99.7% seller rating, 30-day returns
          </p>

          <div style={{ padding: 16, backgroundColor: '#fee2e2', border: '4px solid #ef4444', borderRadius: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#991b1b' }}>
              🚫 What you CAN'T see (Compatibility Issues):
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: '#7f1d1d' }}>
              <li><strong>Regional incompatibility:</strong> US consoles output NTSC video signal. Australian TVs use PAL. Won't work without converter ($50-$150) or NTSC-compatible TV.</li>
              <li><strong>Total landed cost:</strong> US $88 + US $108.64 shipping = US $196.64. Convert to AUD at current rate (~AU $280-$300). May incur GST if over AU $1,000 threshold.</li>
              <li><strong>No games included:</strong> "No game included" stated in description. N64 games typically AU $30-$100 each on eBay. Popular titles (Mario 64, Goldeneye): $50-$80.</li>
              <li><strong>Controller condition unknown:</strong> "Working" doesn't specify joystick condition. N64 analog sticks wear significantly. Replacement sticks: $15-$30.</li>
              <li><strong>Return shipping cost:</strong> 30-day returns, but YOU pay return shipping to USA (~$100+ from Australia).</li>
              <li><strong>Local alternative:</strong> Search "Nintendo 64 Australia" on Facebook Marketplace or Gumtree. PAL consoles with games commonly listed $120-$200.</li>
            </ul>
          </div>

          <div style={{ padding: 16, backgroundColor: '#fee2e2', borderRadius: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#991b1b' }}>
              ⚠️ Consider: Total cost ~AU $280-$300 for incompatible console vs AU $120-$200 locally for compatible PAL console with games. Check local marketplaces first.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 32, backgroundColor: '#dbeafe', borderRadius: 12, textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, color: '#1e40af' }}>
          This is what $5 buys you
        </h2>
        <p style={{ fontSize: 16, marginBottom: 24, color: '#1e40af' }}>
          Not just a summary — the hidden intelligence that could save you thousands.
        </p>
        <a 
          href="/"
          style={{ 
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700
          }}
        >
          Analyze Your Listing →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '4px solid #3b82f6', paddingTop: 24, textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <a href="/" style={{ margin: '0 12px' }}>Home</a>
          <a href="/demo" style={{ margin: '0 12px' }}>Demo</a>
          <a href="/legal" style={{ margin: '0 12px' }}>FAQ & Legal</a>
          <a href="mailto:hello@listinglens.app" style={{ margin: '0 12px' }}>Contact</a>
        </div>
        <p style={{ fontSize: 13 }}>
          © 2025 Listing Lens. Your screenshot is deleted after 30 seconds.
        </p>
      </footer>

    </div>
  );
}
