import { Link } from 'react-router-dom';

const problems = [
  {
    icon: '👗',
    color: 'purple',
    title: 'Clothes Don\'t Fit My Shape',
    desc: 'Standard sizes ignore body proportions — what looks great on a model can look completely different on you.',
  },
  {
    icon: '🎨',
    color: 'pink',
    title: 'Wrong Colors for My Skin Tone',
    desc: 'Picking colors without knowing your complexion leads to outfits that wash you out or clash.',
  },
  {
    icon: '📏',
    color: 'orange',
    title: 'Size Inconsistencies Across Brands',
    desc: 'A size M in one brand is an L in another. Returns are frustrating and time-consuming.',
  },
  {
    icon: '🌀',
    color: 'blue',
    title: 'Overwhelmed by Too Many Options',
    desc: 'Millions of products, no smart filter. Finding the right piece feels like searching for a needle in a haystack.',
  },
  {
    icon: '📸',
    color: 'green',
    title: 'Photos vs. Reality Gap',
    desc: 'Professional lighting, editing, and models make clothes look nothing like they do in real life.',
  },
];

const steps = [
  {
    emoji: '📷',
    title: 'Webcam Body Scan',
    desc: 'A quick, privacy-first scan using your device camera captures your body proportions in seconds — no measurements needed.',
  },
  {
    emoji: '🎭',
    title: 'Skin Tone Detection',
    desc: 'Tanmaya\'s AI reads your skin undertone to identify the color palette that naturally flatters you.',
  },
  {
    emoji: '🧠',
    title: 'AI Analysis Engine',
    desc: 'Our model analyzes body type, proportions, color compatibility, and the event you\'re dressing for.',
  },
  {
    emoji: '✨',
    title: 'Personalized Recommendations',
    desc: 'Get curated outfits from top platforms like Amazon, Myntra, Flipkart — filtered perfectly for your style and occasion.',
  },
];

export default function LandingPage() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">✦ Tanmaya</div>
        <ul className="nav-links">
          <li><a href="#problems">Problems</a></li>
          <li><a href="#how">How It Works</a></li>
          <li>
            <Link to="/survey" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem', backgroundColor: 'transparent' }}>
              Take Survey →
            </Link>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-powered fashion assistant · Coming soon
        </div>

        <h1 className="hero-title">
          Find the Perfect Outfit<br />
          for Your Body <span className="gradient-text">with AI</span>
        </h1>

        <p className="hero-desc">
          Style that honors you. Exactly as you are.
AI-powered body and color analysis to help you find outfits that make you feel confident, beautiful, and empowered. Step into your style journey today.
        </p>

        <div className="hero-cta-group">
          <Link to="/survey" className="btn-outline">
            🎯 Take the Survey
          </Link>
          <a href="#how" className="btn-outline">
            See How It Works
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <h3>6s</h3>
            <p>Body scan time</p>
          </div>
          <div className="hero-stat">
            <h3>95%</h3>
            <p>Fit accuracy</p>
          </div>
          <div className="hero-stat">
            <h3>1M+</h3>
            <p>Products indexed</p>
          </div>
          <div className="hero-stat">
            <h3>0</h3>
            <p>Images stored</p>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="problems" style={{ background: 'var(--color-bg2)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="section">
          <span className="section-label">The Problem</span>
          <h2 className="section-title">Why Shopping Online for Clothes is Broken</h2>
          <p className="section-subtitle">
            Billions of fashion items exist online, yet finding something that truly fits and flatters is nearly impossible.
          </p>
          <div className="problems-grid">
            {problems.map((p, i) => (
              <div className="problem-card" key={i}>
                <div className={`problem-icon ${p.color}`}>{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section">
          <span className="section-label">Solution</span>
          <h2 className="section-title">How Tanmaya Works</h2>
          <p className="section-subtitle">
            Four smart steps that turn your camera into a personal fashion specialist.
          </p>

          <div className="steps-container">
            {steps.map((step, i) => (
              <div className="step-row" key={i}>
                <div className="step-left">
                  <div className="step-number">{i + 1}</div>
                  {i < steps.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-content">
                  <div className="step-emoji">{step.emoji}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SURVEY CTA BANNER */}
      <section style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
          <span className="section-label">Help Us Build This</span>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Shape the Future of Fashion AI
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            We're in early development. Help us understand your exact needs with a 3-minute survey — and get first access when we launch.
          </p>
          <Link to="/survey" className="btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2.8rem' }}>
            🚀 Take the Survey — Get Early Access
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">✦ Tanmaya</div>
        <p className="footer-tagline">AI Fashion Assistant · Powered by Computer Vision & Deep Learning</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span className="privacy-note">🔒 Your webcam images are never stored or uploaded</span>
          <span className="privacy-note">✦ Privacy-first by design</span>
        </div>
        <p className="footer-copy">© 2026 Tanmaya. All rights reserved.</p>
      </footer>
    </>
  );
}
