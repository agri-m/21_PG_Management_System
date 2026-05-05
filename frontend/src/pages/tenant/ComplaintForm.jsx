import { useState } from 'react';
import { MdSend, MdCheckCircle, MdHistory } from 'react-icons/md';
import './ComplaintForm.css';

const CATEGORIES = ['Maintenance', 'Plumbing', 'Electrical', 'AC / Cooling', 'WiFi / Internet', 'Housekeeping', 'Security', 'Noise', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

const PREV_COMPLAINTS = [
  { id: 1, category: 'AC / Cooling', desc: 'AC not cooling properly in Room 101', date: '2026-04-20', status: 'Resolved',  priority: 'High' },
  { id: 2, category: 'WiFi / Internet', desc: 'Internet disconnecting frequently', date: '2026-03-15', status: 'In Progress', priority: 'Medium' },
  { id: 3, category: 'Plumbing', desc: 'Water tap dripping in bathroom',        date: '2026-03-01', status: 'Resolved',  priority: 'Low' },
];

const PRIORITY_COLORS = { Low: '#00C897', Medium: '#FFB648', High: '#FF6584', Urgent: '#FF4757' };

export default function ComplaintForm() {
  const [form, setForm] = useState({ category: 'Maintenance', priority: 'Medium', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState('new');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab('history'); }, 2500);
    setForm({ category: 'Maintenance', priority: 'Medium', description: '' });
  };

  const statusBadge = (s) => s === 'Resolved' ? 'badge-success' : s === 'In Progress' ? 'badge-warning' : 'badge-info';

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Complaints</h1>
        <p>Submit maintenance or service complaints to the admin.</p>
      </div>

      {/* Tabs */}
      <div className="complaint-tabs">
        <button className={`complaint-tab ${tab === 'new' ? 'complaint-tab--active' : ''}`} onClick={() => setTab('new')} id="complaint-tab-new">New Complaint</button>
        <button className={`complaint-tab ${tab === 'history' ? 'complaint-tab--active' : ''}`} onClick={() => setTab('history')} id="complaint-tab-history">
          <MdHistory /> History ({PREV_COMPLAINTS.length})
        </button>
      </div>

      {tab === 'new' && (
        <div className="complaint-layout">
          <form className="card" onSubmit={handleSubmit} id="complaint-form">
            <div className="card-header">
              <h3 className="card-title">Submit a Complaint</h3>
            </div>

            {submitted && (
              <div className="alert alert-success" id="complaint-success-alert">
                <MdCheckCircle /> Complaint submitted! Admin will respond within 24 hours.
              </div>
            )}

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-control" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} id="complaint-category-select">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority *</label>
                <select className="form-control" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} id="complaint-priority-select" style={{ borderLeftColor: PRIORITY_COLORS[form.priority], borderLeftWidth: 3 }}>
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Priority Indicator */}
            <div className="priority-indicator" style={{ borderColor: PRIORITY_COLORS[form.priority] }}>
              <span className="priority-dot" style={{ background: PRIORITY_COLORS[form.priority] }} />
              <span style={{ color: PRIORITY_COLORS[form.priority], fontWeight: 600, fontSize: '0.82rem' }}>{form.priority} Priority</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: 'auto' }}>
                {form.priority === 'Urgent' ? 'Will be addressed immediately' :
                 form.priority === 'High' ? 'Within 12 hours' :
                 form.priority === 'Medium' ? 'Within 48 hours' : 'Within 1 week'}
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-control"
                rows={5}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                required
                placeholder="Describe the issue in detail. Include location, severity, and any relevant details…"
                id="complaint-desc-textarea"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} id="complaint-submit-btn">
              <MdSend /> Submit Complaint
            </button>
          </form>

          {/* Tips Panel */}
          <div className="card complaint-tips">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-md)' }}>Tips for Faster Resolution</h3>
            {[
              { tip: 'Be specific about the location (e.g., "bathroom tap" not just "tap")', icon: '📍' },
              { tip: 'Mention when the issue started to help prioritize', icon: '🕐' },
              { tip: 'Use "Urgent" priority only for safety hazards', icon: '⚠️' },
              { tip: 'You can track status in the History tab', icon: '📋' },
            ].map((t, i) => (
              <div key={i} className="complaint-tip">
                <span>{t.icon}</span>
                <p>{t.tip}</p>
              </div>
            ))}
            <div className="divider" />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              For urgent issues, contact the guard desk directly.
            </p>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="complaint-history fade-in">
          {PREV_COMPLAINTS.map(c => (
            <div key={c.id} className="complaint-history-card card">
              <div className="complaint-history-card__header">
                <div>
                  <span className="badge badge-primary" style={{ marginRight: 'var(--space-sm)' }}>{c.category}</span>
                  <span className="badge" style={{ background: `${PRIORITY_COLORS[c.priority]}22`, color: PRIORITY_COLORS[c.priority], border: `1px solid ${PRIORITY_COLORS[c.priority]}44` }}>{c.priority}</span>
                </div>
                <span className={`badge ${statusBadge(c.status)}`}>{c.status}</span>
              </div>
              <p className="complaint-history-card__desc">{c.desc}</p>
              <p className="complaint-history-card__date">Submitted: {c.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
