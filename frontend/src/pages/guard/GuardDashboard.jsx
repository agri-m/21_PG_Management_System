import { MdSecurity, MdCheckCircle, MdCancel, MdAccessTime, MdPeople } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import StatCard from '../../components/admin/StatCard';
import { Link } from 'react-router-dom';
import './GuardDashboard.css';

const TODAY_VISITORS = [
  { id: 1, name: 'Rahul Verma',  host: 'Aman Gupta',   room: '101', entryTime: '10:30 AM', exitTime: '11:45 AM', status: 'Left',    purpose: 'Family Visit' },
  { id: 2, name: 'Sunita Devi',  host: 'Priya Sharma', room: '102', entryTime: '11:15 AM', exitTime: null,        status: 'Inside',  purpose: 'Delivery' },
  { id: 3, name: 'Mohan Lal',    host: 'Karan Mehta',  room: '201', entryTime: '12:00 PM', exitTime: '01:30 PM', status: 'Left',    purpose: 'Friend Visit' },
  { id: 4, name: 'Raj Kumar',    host: 'Rohit Das',    room: '301', entryTime: '03:30 PM', exitTime: null,        status: 'Pending', purpose: 'Official' },
  { id: 5, name: 'Kavita Joshi', host: 'Aman Gupta',   room: '101', entryTime: '04:45 PM', exitTime: null,        status: 'Inside',  purpose: 'Friend Visit' },
];

const getStatusBadge = (s) => {
  if (s === 'Inside')  return 'badge-success';
  if (s === 'Left')    return 'badge-info';
  if (s === 'Pending') return 'badge-warning';
  return 'badge-danger';
};

export default function GuardDashboard() {
  const inside  = TODAY_VISITORS.filter(v => v.status === 'Inside').length;
  const left    = TODAY_VISITORS.filter(v => v.status === 'Left').length;
  const pending = TODAY_VISITORS.filter(v => v.status === 'Pending').length;

  return (
    <div className="page-content fade-in">
      <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <h1>Guard Overview</h1>
          <p>Monitor visitor entries and current occupancy status.</p>
        </div>
        <Link to="/guard/visitors" className="btn btn-primary" id="guard-new-entry-btn">
          <MdSecurity /> Log New Entry
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard icon={<MdPeople />}     label="Today's Visitors" value={TODAY_VISITORS.length} color="#6C63FF" />
        <StatCard icon={<FaShieldAlt />}  label="Currently Inside" value={inside}  color="#00C897" sub="Logged in" />
        <StatCard icon={<MdCheckCircle />} label="Exited"          value={left}    color="#00B4D8" sub="Today" />
        <StatCard icon={<MdAccessTime />} label="Awaiting Approval" value={pending} color="#FFB648" sub="Pending admin" />
      </div>

      {/* Visitor Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="card-title">Today's Visitor Log</h3>
          <div className="guard-live-indicator">
            <span className="guard-live-dot" />
            <span>Live</span>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>Visitor</th><th>Host</th><th>Room</th><th>Purpose</th><th>Entry</th><th>Exit</th><th>Status</th></tr>
            </thead>
            <tbody>
              {TODAY_VISITORS.map(v => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600 }}>{v.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{v.host}</td>
                  <td><div className="room-number-badge">#{v.room}</div></td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{v.purpose}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{v.entryTime}</td>
                  <td style={{ color: v.exitTime ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>{v.exitTime || '—'}</td>
                  <td><span className={`badge ${getStatusBadge(v.status)}`}>{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
