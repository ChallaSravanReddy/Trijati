import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = '/api';

export default function AdminPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/survey/admin/responses`);
      setResponses(res.data);
    } catch (err) {
      setError('Failed to load responses. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    window.open(`${API_BASE}/survey/admin/export`, '_blank');
  };

  const earlyCustomerCount = responses.filter(r => r.early_customer).length;

  return (
    <div className="admin-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo"> Trijati</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/survey">Survey</Link></li>
        </ul>
      </nav>

      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>📊 Survey Responses</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Admin dashboard — all survey submissions
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-outline" onClick={fetchResponses}>
            ↻ Refresh
          </button>
          <button className="btn-primary" onClick={handleExport}>
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="stat-num">{responses.length}</div>
          <div className="stat-label">Total Responses</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-num">{earlyCustomerCount}</div>
          <div className="stat-label">Early Customers</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-num">
            {responses.length > 0
              ? Math.round((earlyCustomerCount / responses.length) * 100)
              : 0}%
          </div>
          <div className="stat-label">Early Access Rate</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-num">{responses.filter(r => r.ai_interest?.startsWith('Very')).length}</div>
          <div className="stat-label">Highly Interested</div>
        </div>
      </div>

      {/* Error */}
      {error && <div className="error-msg">⚠️ {error}</div>}

      {/* Table */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : responses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No responses yet</h3>
          <p>Share the survey link to start collecting data.</p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/survey" className="btn-primary">Open Survey →</Link>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Platforms</th>
                <th>Biggest Problem</th>
                <th>Frequency</th>
                <th>AI Interest</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((r, i) => (
                <tr key={r.id}>
                  <td style={{ color: 'var(--color-text-muted)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td style={{ color: 'var(--color-primary-light)' }}>{r.email}</td>
                  <td>{r.age_group || '—'}</td>
                  <td>{r.gender || '—'}</td>
                  <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {Array.isArray(r.shopping_platform)
                      ? r.shopping_platform.join(', ')
                      : r.shopping_platform || '—'}
                  </td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.biggest_problem || '—'}
                  </td>
                  <td>{r.shopping_frequency || '—'}</td>
                  <td>{r.ai_interest || '—'}</td>
                  <td>
                    <span className={`badge ${r.early_customer ? 'badge-early' : 'badge-regular'}`}>
                      {r.early_customer ? '⭐ Early' : 'Regular'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(r.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
