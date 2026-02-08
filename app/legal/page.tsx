'use client';

import { useState } from 'react';

export default function LegalPage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const bg = darkMode ? '#09090b' : '#fafaf9';
  const text = darkMode ? '#fafafa' : '#18181b';
  const muted = darkMode ? '#a1a1aa' : '#52525b';
  const cardBg = darkMode ? '#18181b' : '#ffffff';
  const border = darkMode ? '#27272a' : '#e7e5e4';
  const blue = '#3b82f6';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: text }}>
      
      {/* HEADER */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: darkMode ? 'rgba(9, 9, 11, 0.95)' : 'rgba(250, 250, 249, 0.95)', 
        backdropFilter: 'blur(8px)', 
        borderBottom: '1px solid ' + border 
      }}>
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none' }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: darkMode ? '#71717a' : '#78716c', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
              Online
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: darkMode ? '#ffffff' : '#18181b', lineHeight: 1 }}>
              LISTING LENS
            </span>
          </a>
          <button 
            onClick={toggleDarkMode}
            style={{ 
              padding: 10, 
              borderRadius: '50%', 
              border: 'none', 
              backgroundColor: darkMode ? '#27272a' : '#f5f5f4', 
              color: darkMode ? '#fbbf24' : '#52525b', 
              cursor: 'pointer'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 896, margin: '0 auto', padding: '48px 24px' }}>
        
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>
          FAQ & Legal
        </h1>

        {/* PRICING */}
        <section id="pricing" style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Pricing</h2>
          <div style={{ padding: 32, backgroundColor: cardBg, border: '2px solid ' + border, borderRadius: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: blue, marginBottom: 16 }}>$5</div>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Per report. That's it.</p>
            <p style={{ fontSize: 14, color: muted }}>
              One screenshot. One payment. One comprehensive report. No subscriptions, no hidden fees.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>FAQ</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>How does it work?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Upload a screenshot of any marketplace listing. Our AI analyzes it and searches public databases, forums, and market data to find hidden intelligence — recalls, true costs, red flags, and fair value. You get a comprehensive buyer report in seconds.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>What categories do you support?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Vehicles, property, electronics, fashion, watches & jewellery, and everything else. If it's listed for sale, we can analyze it.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Which regions do you cover?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Australia, New Zealand, Singapore, and Rest of World (beta). Pricing is always $5 in your local currency (AUD/NZD/SGD/USD).
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Is this legal? Does it scrape websites?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Yes, it's completely legal. Listing Lens doesn't scrape, crawl, or access websites in unauthorized ways. We search publicly available information the same way you would — recall databases, owner forums, review sites, and market data anyone can access. We don't log into platforms, bypass paywalls, or collect personal data.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>What happens to my screenshot?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Your screenshot is analyzed, your report is delivered, and your image is permanently deleted after 30 seconds. We don't store, log, or keep any screenshots. Privacy isn't a feature — it's how we built this.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Can I get a refund?</h3>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                No refunds. The $5 payment is final once you receive your report. Our demo page shows exactly what you'll get before you pay.
              </p>
            </div>

          </div>
        </section>

        {/* PRIVACY POLICY */}
        <section id="privacy" style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Privacy Policy</h2>
          <div style={{ fontSize: 14, color: muted, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              <strong>Last updated:</strong> February 8, 2025
            </p>
            
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>What We Collect</h3>
            <p style={{ marginBottom: 16 }}>
              • Payment information (processed by Stripe — we never see your card details)<br/>
              • The screenshot you upload (deleted after 30 seconds)<br/>
              • Basic usage data (timestamp, region, category)
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>What We Don't Collect</h3>
            <p style={{ marginBottom: 16 }}>
              • Personal information<br/>
              • Email addresses<br/>
              • User accounts<br/>
              • Long-term storage of screenshots
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>How We Use Data</h3>
            <p style={{ marginBottom: 16 }}>
              Your screenshot is used solely to generate your buyer intelligence report. After analysis, it's permanently deleted within 30 seconds. We use Anthropic Claude AI to analyze listings and search public information.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Data Security</h3>
            <p style={{ marginBottom: 16 }}>
              All data transmission is encrypted via HTTPS. Screenshots are processed in-memory and immediately deleted. Payment processing is handled by Stripe (PCI compliant).
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Contact</h3>
            <p>
              Questions? Email <a href="mailto:hello@listinglens.app" style={{ color: blue }}>hello@listinglens.app</a>
            </p>
          </div>
        </section>

        {/* TERMS OF SERVICE */}
        <section id="terms" style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Terms of Service</h2>
          <div style={{ fontSize: 14, color: muted, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              <strong>Last updated:</strong> February 8, 2025
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Service Description</h3>
            <p style={{ marginBottom: 16 }}>
              Listing Lens provides AI-powered marketplace analysis reports for a one-time fee of $5. You upload a screenshot, we analyze it, you receive a report. That's it.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>What You Get</h3>
            <p style={{ marginBottom: 16 }}>
              A comprehensive buyer intelligence report based on publicly available information. Reports may include recalls, market comparisons, hidden costs, red flags, and negotiation tips.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>What You Don't Get</h3>
            <p style={{ marginBottom: 16 }}>
              • Professional buying advice (we're not financial/legal advisors)<br/>
              • Guarantees of accuracy (we search public data, but can't verify everything)<br/>
              • Refunds (payment is final once you receive your report)<br/>
              • Account management (there are no accounts — it's one screenshot, one payment, one report)
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Your Responsibilities</h3>
            <p style={{ marginBottom: 16 }}>
              • Don't upload screenshots containing illegal content<br/>
              • Don't abuse the service (we detect and block abuse)<br/>
              • Use the report as one data point in your research, not the only one<br/>
              • Verify important information independently
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Limitations</h3>
            <p style={{ marginBottom: 16 }}>
              Reports are based on publicly available information at the time of analysis. We can't guarantee completeness or accuracy. We're not liable for buying decisions you make based on our reports. This is an information service, not professional advice.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Abuse Prevention</h3>
            <p style={{ marginBottom: 16 }}>
              We detect and block abuse (spam uploads, testing limits, offensive content). Abusive users may receive generic reports or be blocked entirely. No refunds for abuse.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Changes</h3>
            <p style={{ marginBottom: 16 }}>
              We may update these terms. Changes take effect immediately upon posting. Continued use means you accept the changes.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12, color: text }}>Contact</h3>
            <p>
              Questions? Email <a href="mailto:hello@listinglens.app" style={{ color: blue }}>hello@listinglens.app</a>
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ 
        borderTop: '4px solid ' + blue,
        borderRadius: '4px 4px 0 0',
        padding: '32px 24px',
        backgroundColor: cardBg
      }}>
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', fontSize: 14, marginBottom: 24 }}>
            <a href="/" style={{ color: muted, textDecoration: 'none' }}>Home</a>
            <a href="/demo" style={{ color: muted, textDecoration: 'none' }}>Demo</a>
            <a href="/legal" style={{ color: muted, textDecoration: 'none' }}>FAQ & Legal</a>
            <a href="mailto:hello@listinglens.app" style={{ color: muted, textDecoration: 'none' }}>Contact</a>
          </div>
          <p style={{ fontSize: 13, color: muted }}>
            © 2026 Listing Lens. Your screenshot is deleted after 30 seconds.
          </p>
        </div>
      </footer>

    </div>
  );
}
