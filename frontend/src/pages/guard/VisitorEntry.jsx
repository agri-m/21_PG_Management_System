import { useState } from 'react';
import { MdSecurity, MdCheckCircle, MdAccessTime } from 'react-icons/md';
import { FaUser, FaPhone, FaHome, FaClipboard } from 'react-icons/fa';
import './VisitorEntry.css';

const TENANTS = [
  { name: 'Aman Gupta',   room: '101' },
  { name: 'Priya Sharma', room: '102' },
  { name: 'Karan Mehta',  room: '201' },
  { name: 'Sana Khan',    room: '202' },
  { name: 'Rohit Das',    room: '301' },
];

const PURPOSES = ['Family Visit', 'Friend Visit', 'Official', 'Delivery', 'Service', 'Other'];

const EMPTY_FORM = { visitorName: '', phone: '', hostTenant: '', purpose: 'Family Visit', gender: 'Male', notes: '', entryTime: new Date().toTimeString().slice(0, 5) };

const RECENT_ENTRIES = [
  { id: 1, name: 'Rahul Verma',  host: 'Aman Gupta',   room: '101', time: '10:30 AM', status: 'Inside' },
  { id: 2, name: 'Sunita Devi',  host: 'Priya Sharma', room: '102', time: '11:15 AM', status: 'Left' },
  { id: 3, name: 'Kavita Joshi', host: 'Aman Gupta',   room: '101', time: '04:45 PM', status: 'Inside' },
];

export default function VisitorEntry() {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries]     = useState(RECENT_ENTRIES);

  const selectedTenant = TENANTS.find(t => t.name === form.hostTenant);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: form.visitorName,
      host: form.hostTenant,
      room: selectedTenant?.room || '—',
      time: form.entryTime,
      status: 'Inside',
    };
    setEntries(prev => [newEntry, ...prev]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Visitor Entry</h1>
        <p>Log new visitor entries and track who is currently inside.</p>
      </div>

      <div className="visitor-entry-layout">
        {/* Form */}
        <form className="card" onSubmit={handleSubmit} id="visitor-entry-form">
          <div className="card-header">
            <h3 className="card-title"><MdSecurity style={{ marginRight: 8, verticalAlign: 'middle' }} />Log Entry</h3>
            <div className="guard-live-indicator">
              <span className="guard-live-dot" />Live
            </div>
          </div>

          {submitted && (
            <div className="alert alert-success" id="visitor-entry-success">
              <MdCheckCircle style={{ fontSize: '1.2rem' }} />
              Visitor entry logged successfully!
            </div>
          )}

          <div className="grid grid-2">
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Visitor Full Name *</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input className="form-control" value={form.visitorName} onChange={e => setForm(p => ({ ...p, visitorName: e.target.value }))} required placeholder="Full name of visitor" id="visitor-name-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input className="form-control" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required placeholder="10-digit number" id="visitor-phone-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-control" value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))} id="visitor-gender-select">
                {['Male','Female','Other'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Host Tenant *</label>
              <div className="input-with-icon">
                <FaHome className="input-icon" />
                <select className="form-control" value={form.hostTenant} onChange={e => setForm(p => ({ ...p, hostTenant: e.target.value }))} required id="visitor-host-select" style={{ paddingLeft: 32 }}>
                  <option value="">Select tenant…</option>
                  {TENANTS.map(t => <option key={t.name} value={t.name}>{t.name} (Room {t.room})</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Purpose *</label>
              <div className="input-with-icon">
                <FaClipboard className="input-icon" />
                <select className="form-control" value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))} id="visitor-purpose-select" style={{ paddingLeft: 32 }}>
                  {PURPOSES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Entry Time</label>
              <div className="input-with-icon">
                <MdAccessTime className="input-icon" />
                <input className="form-control" type="time" value={form.entryTime} onChange={e => setForm(p => ({ ...p, entryTime: e.target.value }))} id="visitor-time-input" />
              </div>
            </div>
          </div>

          {/* Host confirmation */}
          {selectedTenant && (
            <div className="visitor-host-confirm">
              <div className="visitor-host-confirm__icon">🏠</div>
              <div>
                <p><strong>{selectedTenant.name}</strong></p>
                <span>Room #{selectedTenant.room}</span>
              </div>
              <span className="badge badge-success">Confirmed</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-control" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any additional notes (optional)…" id="visitor-notes-input" style={{ resize: 'vertical' }} />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} id="visitor-entry-submit">
            <MdSecurity /> Log Entry
          </button>
        </form>

        {/* Recent Entries */}
        <div className="card visitor-recent">
          <div className="card-header">
            <h3 className="card-title">Currently Inside</h3>
            <span className="badge badge-success">{entries.filter(e => e.status === 'Inside').length} Active</span>
          </div>
          <div className="visitor-recent-list">
            {entries.map(e => (
              <div key={e.id} className={`visitor-recent-item ${e.status === 'Inside' ? 'visitor-recent-item--inside' : ''}`}>
                <div className="visitor-avatar" style={{ width: 38, height: 38, minWidth: 38, fontSize: '0.75rem' }}>
                  {e.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="visitor-recent-info">
                  <p>{e.name}</p>
                  <span>→ {e.host} (#{e.room})</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{e.time}</p>
                  <span className={`badge ${e.status === 'Inside' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
