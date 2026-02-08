'use client';

import { useState } from 'react';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newMode.toString());
    }
  };

  const bg = darkMode ? '#09090b' : '#fafaf9';
  const text = darkMode ? '#fafafa' : '#18181b';
  const muted = darkMode ? '#a1a1aa' : '#71717a';
  const cardBg = darkMode ? '#18181b' : '#ffffff';
  const border = darkMode ? '#27272a' : '#e7e5e4';
  const blue = '#3b82f6';
  const green = '#22c55e';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text }}>
      
      {/* HEADER */}
      <header style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '24px 24px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em' }}>
          LISTING LENS
        </h1>
        <button 
          onClick={toggleDarkMode}
          style={{ 
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            padding: 8
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        
        {/* HERO */}
        <section style={{ textAlign: 'center', marginBottom: 80 }}>
          <h1 style={{ 
            fontSize: 64, 
            fontWeight: 900, 
            letterSpacing: '-0.03em', 
            margin: '0 0 24px', 
            lineHeight: 1.1 
          }}>
            One screenshot.<br/>
            Instant answers.
          </h1>
          <p style={{ 
            fontSize: 20, 
            color: muted, 
            maxWidth: 600, 
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Upload any marketplace listing. See what's hidden. Pay only if it's valuable.
          </p>
          
          {/* UPLOAD BUTTON */}
          <button
            style={{
              padding: '20px 48px',
              fontSize: 18,
              fontWeight: 700,
              backgroundColor: blue,
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s'
            }}
          >
            Try It Free - Upload Screenshot →
          </button>

          <p style={{ fontSize: 14, color: muted, marginTop: 16, fontWeight: 500 }}>
            Free preview • Pay $5 only for full report
          </p>
        </section>

        {/* HOW IT WORKS - VISUAL FLOW */}
        <section style={{ 
          marginBottom: 80,
          padding: '48px 32px',
          backgroundColor: darkMode ? '#18181b' : '#f5f5f4',
          borderRadius: 16
        }}>
          <h2 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            textAlign: 'center', 
            marginBottom: 16 
          }}>
            How it works
          </h2>
          <p style={{
            fontSize: 16,
            color: muted,
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto 48px'
          }}>
            No risk. You see what we found before you pay anything.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 40,
            maxWidth: 900,
            margin: '0 auto'
          }}>
            
            {/* Step 1: Upload */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 20px',
                backgroundColor: darkMode ? '#27272a' : '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                border: '4px solid ' + blue,
                boxShadow: darkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                📸
              </div>
              <div style={{ 
                fontSize: 12,
                fontWeight: 700,
                color: blue,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Step 1 • Free
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
                Upload Screenshot
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6 }}>
                Drag & drop any marketplace listing from Carsales, Domain, eBay, Facebook Marketplace - anywhere.
              </p>
            </div>

            {/* Step 2: Preview */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 20px',
                backgroundColor: darkMode ? '#27272a' : '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                border: '4px solid ' + blue,
                boxShadow: darkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                🔍
              </div>
              <div style={{ 
                fontSize: 12,
                fontWeight: 700,
                color: blue,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Step 2 • Free
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
                See Preview
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6 }}>
                We analyze in 15 seconds and show you the first 3 red flags. See if there's value before paying.
              </p>
            </div>

            {/* Step 3: Unlock */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 20px',
                backgroundColor: darkMode ? '#27272a' : '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                border: '4px solid ' + green,
                boxShadow: darkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                💰
              </div>
              <div style={{ 
                fontSize: 12,
                fontWeight: 700,
                color: green,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Step 3 • $5
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
                Unlock Full Report
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6 }}>
                Pay $5 to unlock hidden costs, owner experiences, suburb intel, and critical questions to ask.
              </p>
            </div>

          </div>

          {/* Trust Badge */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 48,
            padding: 24,
            backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe',
            borderRadius: 12
          }}>
            <p style={{ 
              fontSize: 17, 
              fontWeight: 700,
              color: darkMode ? '#93c5fd' : '#1e40af',
              margin: 0,
              lineHeight: 1.5
            }}>
              💡 You see what we found BEFORE you pay.<br/>
              No risk. No surprises. Pay only if it's valuable.
            </p>
          </div>
        </section>

        {/* DEMO EXAMPLES */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            textAlign: 'center', 
            marginBottom: 16 
          }}>
            See what buyers miss
          </h2>
          <p style={{
            fontSize: 16,
            color: muted,
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto 48px'
          }}>
            Real examples. Real hidden intelligence.
          </p>

          <div style={{ 
            display: 'grid', 
            gap: 24, 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' 
          }}>
            
            {/* Jeep */}
            <div style={{ 
              padding: 32, 
              backgroundColor: cardBg, 
              border: '2px solid ' + border, 
              borderRadius: 12,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🚗</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
                Modified Jeep
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginBottom: 20 }}>
                $51,950 asking. Check VIN for recalls. Check for modifications - engineering cert required? Insurance quotes needed.
              </p>
              <a 
                href="/demo#jeep" 
                style={{ 
                  color: green, 
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                See full analysis →
              </a>
            </div>

            {/* Apartment */}
            <div style={{ 
              padding: 32, 
              backgroundColor: cardBg, 
              border: '2px solid ' + border, 
              borderRadius: 12,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
                Carlton Apartment
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginBottom: 20 }}>
                $1.8M listing. Body corp fees not disclosed. Repayment calculation unclear. Questions to ask before buying.
              </p>
              <a 
                href="/demo#apartment" 
                style={{ 
                  color: green, 
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                See full analysis →
              </a>
            </div>

            {/* Nintendo */}
            <div style={{ 
              padding: 32, 
              backgroundColor: cardBg, 
              border: '2px solid ' + border, 
              borderRadius: 12,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
                Nintendo 64
              </h3>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginBottom: 20 }}>
                US $88 + $109 shipping. NTSC console won't work on AU TVs without converter. Check local PAL options first.
              </p>
              <a 
                href="/demo#nintendo" 
                style={{ 
                  color: '#ef4444', 
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                See full analysis →
              </a>
            </div>

          </div>

          {/* CTA after demos */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 48,
            padding: 32,
            backgroundColor: darkMode ? '#18181b' : '#ffffff',
            border: '2px solid ' + blue,
            borderRadius: 12
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
              Try it with your own listing
            </h3>
            <p style={{ fontSize: 16, color: muted, marginBottom: 24 }}>
              Upload free, see preview, pay only if valuable.
            </p>
            <button
              style={{
                padding: '16px 40px',
                fontSize: 16,
                fontWeight: 700,
                backgroundColor: blue,
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >
              Upload Screenshot - Free Preview →
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ 
        maxWidth: 1200,
        margin: '0 auto',
        padding: '48px 24px',
        borderTop: '1px solid ' + border,
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: 32, 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 24
        }}>
          <a href="/demo" style={{ color: muted, textDecoration: 'none', fontSize: 14 }}>
            Demo
          </a>
          <a href="/legal" style={{ color: muted, textDecoration: 'none', fontSize: 14 }}>
            FAQ & Legal
          </a>
          <a href="mailto:hello@listinglens.app" style={{ color: muted, textDecoration: 'none', fontSize: 14 }}>
            Contact
          </a>
        </div>
        <p style={{ fontSize: 14, color: muted, margin: 0 }}>
          © 2026 Listing Lens. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
