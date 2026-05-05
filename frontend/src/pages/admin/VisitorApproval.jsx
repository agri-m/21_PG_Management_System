import { useState } from 'react';
import { MdCheckCircle, MdCancel, MdSearch, MdSecurity, MdAccessTime } from 'react-icons/md';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';
import Modal from '../../components/admin/Modal';
import StatCard from '../../components/admin/StatCard';
import './VisitorApproval.css';

const INITIAL_VISITORS = [
  { id: 1, name: 'Rahul Verma',   phone: '9811223344', host: 'Aman Gupta',   room: '101', purpose: 'Family Visit', entryTime: '10:30 AM', date: '2026-05-05', status: 'Pending' },
  { id: 2, name: 'Sunita Devi',   phone: '9822334455', host: 'Priya Sharma', room: '102', purpose: 'Delivery',     entryTime: '11:15 AM', date: '2026-05-05', status: 'Approved' },
  { id: 3, name: 'Mohan Lal',     phone: '9833445566', host: 'Karan Mehta',  room: '201', purpose: 'Friend Visit', entryTime: '12:00 PM', date: '2026-05-05', status: 'Pending' },
  { id: 4, name: 'Anita Singh',   phone: '9844556677', host: 'Sana Khan',    room: '202', purpose: 'Family Visit', entryTime: '02:00 PM', date: '2026-05-05', status: 'Rejected' },
  { id: 5, name: 'Raj Kumar',     phone: '9855667788', host: 'Rohit Das',    room: '301', purpose: 'Official',     entryTime: '03:30 PM', date: '2026-05-05', status: 'Pending' },
  { id: 6, name: 'Kavita Joshi',  phone: '9866778899', host: 'Aman Gupta',   room: '101', purpose: 'Friend Visit', entryTime: '04:45 PM', date: '2026-05-05', status: 'Approved' },
];

export default function VisitorApproval() {
  const [visitors, setVisitors]   = useState(INITIAL_VISITORS);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('All');
  const [confirmModal, setConfirmModal] = useState(null); // { visitor, action }

  const pending  = visitors.filter(v => v.status === 'Pending').length;
  const approved = visitors.filter(v => v.status === 'Approved').length;
  const rejected = visitors.filter(v => v.status === 'Rejected').length;

  const filtered = visitors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.host.toLowerCase().includes(search.toLowerCase()) || v.room.includes(search);
    const matchFilter = filter === 'All' || v.status === filter;
    return matchSearch && matchFilter;
  });

  const handleAction = (id, action) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: action } : v));
    setConfirmModal(null);
  };

  const getStatusBadge = (s) => {
    if (s === 'Approved') return 'badge-success';
    if (s === 'Rejected') return 'badge-danger';
    return 'badge-warning';
  };

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Visitor Approval</h1>
        <p>Review and approve or reject visitor entry requests.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)', maxWidth: 700 }}>
        <StatCard icon={<MdAccessTime />}  label="Pending"  value={pending}  color="#FFB648" />
        <StatCard icon={<FaUserCheck />}   label="Approved" value={approved} color="#00C897" />
        <StatCard icon={<FaUserTimes />}   label="Rejected" value={rejected} color="#FF4757" />
      </div>

      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="navbar__search" style={{ maxWidth: 280 }}>
          <MdSearch style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }} />
          <input className="navbar__search-input" placeholder="Search visitor, host, room…" value={search} onChange={e => setSearch(e.target.value)} id="visitor-search-input" />
        </div>
        <div className="filter-tabs">
          {['All','Pending','Approved','Rejected'].map(s => (
            <button key={s} className={`filter-tab ${filter === s ? 'filter-tab--active' : ''}`} onClick={() => setFilter(s)} id={`visitor-filter-${s.toLowerCase()}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Visitor Cards Grid */}
      <div className="visitor-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No visitors found
          </div>
        ) : filtered.map(v => (
          <div key={v.id} className={`visitor-card visitor-card--${v.status.toLowerCase()}`}>
            <div className="visitor-card__header">
              <div className="visitor-avatar">
                {v.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div className="visitor-card__info">
                <h4>{v.name}</h4>
                <p>{v.phone}</p>
              </div>
              <span className={`badge ${getStatusBadge(v.status)}`}>{v.status}</span>
            </div>
            <div className="visitor-card__body">
              <div className="visitor-meta">
                <div className="visitor-meta__item">
                  <span>Host</span>
                  <strong>{v.host}</strong>
                </div>
                <div className="visitor-meta__item">
                  <span>Room</span>
                  <strong>#{v.room}</strong>
                </div>
                <div className="visitor-meta__item">
                  <span>Purpose</span>
                  <strong>{v.purpose}</strong>
                </div>
                <div className="visitor-meta__item">
                  <span>Time</span>
                  <strong>{v.entryTime}</strong>
                </div>
              </div>
            </div>
            {v.status === 'Pending' && (
              <div className="visitor-card__actions">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => setConfirmModal({ visitor: v, action: 'Approved' })}
                  id={`approve-visitor-${v.id}`}
                >
                  <MdCheckCircle /> Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setConfirmModal({ visitor: v, action: 'Rejected' })}
                  id={`reject-visitor-${v.id}`}
                >
                  <MdCancel /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      <Modal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={confirmModal?.action === 'Approved' ? '✅ Approve Visitor' : '❌ Reject Visitor'}
        size="sm"
        id="visitor-confirm-modal"
      >
        {confirmModal && (
          <>
            <div className="visitor-confirm-info">
              <div className="visitor-avatar" style={{ margin: '0 auto var(--space-md)', width: 56, height: 56, fontSize: '1.2rem' }}>
                {confirmModal.visitor.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-sm)' }}>{confirmModal.visitor.name}</h3>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--space-lg)' }}>
                Visiting <strong style={{ color: 'var(--text-primary)' }}>{confirmModal.visitor.host}</strong> in Room <strong style={{ color: 'var(--text-primary)' }}>#{confirmModal.visitor.room}</strong>
                <br />Purpose: {confirmModal.visitor.purpose} | {confirmModal.visitor.entryTime}
              </p>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Are you sure you want to <strong style={{ color: confirmModal.action === 'Approved' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>{confirmModal.action === 'Approved' ? 'approve' : 'reject'}</strong> this visitor?
              </p>
            </div>
            <div className="flex gap-sm" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
              <button className="btn btn-secondary" onClick={() => setConfirmModal(null)} id="visitor-confirm-cancel">Cancel</button>
              <button
                className={`btn ${confirmModal.action === 'Approved' ? 'btn-success' : 'btn-danger'}`}
                onClick={() => handleAction(confirmModal.visitor.id, confirmModal.action)}
                id="visitor-confirm-action"
              >
                {confirmModal.action === 'Approved' ? <><MdCheckCircle /> Approve</> : <><MdCancel /> Reject</>}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
