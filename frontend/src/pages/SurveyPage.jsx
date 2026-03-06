import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = '/api';

const SHOPPING_PLATFORMS = [
  'Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Meesho',
  'Nykaa Fashion', 'Zara Online', 'H&M Online', 'Other',
];

const BIGGEST_PROBLEMS = [
  "Clothes don't fit my body shape",
  "Colors don't suit my skin tone",
  "Size differs across brands",
  "Too many options, hard to choose",
  "Clothes look different in real life",
  "Returns are complicated",
  "No personalized recommendations",
];

const FREQUENCY_OPTIONS = [
  'Every week', 'Once a month', 'Every 2-3 months', 'A few times a year', 'Rarely',
];

const AI_INTEREST_OPTIONS = [
  'Very interested — sign me up!',
  'Somewhat interested',
  'Not sure yet',
  'Not interested',
];

const AGE_GROUPS = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+'];
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

export default function SurveyPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age_group: '',
    gender: '',
    shopping_platform: [],
    biggest_problem: '',
    shopping_frequency: '',
    ai_interest: '',
    early_customer: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePlatform = (platform) => {
    setForm(prev => ({
      ...prev,
      shopping_platform: prev.shopping_platform.includes(platform)
        ? prev.shopping_platform.filter(p => p !== platform)
        : [...prev.shopping_platform, platform],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Please fill in your name and email.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/survey`, form);
      setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>You're All Set!</h2>
          {form.early_customer && (
            <div className="success-badge">⭐ Early Tanmaya Customer</div>
          )}
          <p>
            Thank you! {form.early_customer
              ? 'You are now registered as an Early Tanmaya Customer. We will notify you when the AI stylist launches.'
              : 'We appreciate your feedback. We\'ll keep you posted as Tanmaya develops.'}
          </p>
          <Link to="/" className="btn-primary">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo">✦ Tanmaya</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>

      {/* Header */}
      <div className="survey-header">
        <span className="section-label">3-Minute Survey</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Help Us Build the Perfect AI Stylist
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0' }}>
          Your answers will shape how Tanmaya works. Takes under 3 minutes — and you'll get early access if you opt in.
        </p>
      </div>

      <div className="survey-form-wrapper">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-msg">⚠️ {error}</div>}

          {/* Basic Info */}
          <div className="survey-card">
            <h3>👤 About You</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Age Group</label>
              <select name="age_group" value={form.age_group} onChange={handleChange}>
                <option value="">Select your age group</option>
                {AGE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Prefer not to say</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Shopping Habits */}
          <div className="survey-card">
            <h3>🛍️ Your Shopping Habits</h3>
            <div className="form-group">
              <label>Where do you usually shop for clothes? (select all that apply)</label>
              <div className="checkbox-group">
                {SHOPPING_PLATFORMS.map(p => (
                  <label
                    key={p}
                    className={`checkbox-item ${form.shopping_platform.includes(p) ? 'active' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={form.shopping_platform.includes(p)}
                      onChange={() => togglePlatform(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>How often do you buy clothes online?</label>
              <select name="shopping_frequency" value={form.shopping_frequency} onChange={handleChange}>
                <option value="">Select frequency</option>
                {FREQUENCY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Problems */}
          <div className="survey-card">
            <h3>😤 Your Biggest Challenge</h3>
            <div className="form-group">
              <label>What's your biggest problem when buying clothes online?</label>
              <select name="biggest_problem" value={form.biggest_problem} onChange={handleChange}>
                <option value="">Select your biggest problem</option>
                {BIGGEST_PROBLEMS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* AI Interest */}
          <div className="survey-card">
            <h3>🤖 AI Stylist Interest</h3>
            <div className="form-group">
              <label>How interested are you in using an AI-powered personal stylist?</label>
              <select name="ai_interest" value={form.ai_interest} onChange={handleChange}>
                <option value="">Select your level of interest</option>
                {AI_INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Early Access */}
          <label className="early-access-card" htmlFor="early-access-check">
            <input
              type="checkbox"
              id="early-access-check"
              name="early_customer"
              checked={form.early_customer}
              onChange={handleChange}
            />
            <div>
              <div className="early-label">⭐ Get Early Access to Tanmaya</div>
              <div className="early-sub">
                Be among the first to try Tanmaya when it launches. We'll notify you personally.
              </div>
            </div>
          </label>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting...' : '🚀 Submit My Responses'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--color-text-dim)', fontSize: '0.8rem', marginTop: '1rem' }}>
            🔒 Your data is safe. We will never sell or share your information.
          </p>
        </form>
      </div>
    </div>
  );
}
