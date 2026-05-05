import { MdBedroomParent, MdPeople, MdPayments, MdPersonAdd, MdCheckCircle, MdWarning, MdSecurity } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import StatCard from '../../components/admin/StatCard';
import './AdminDashboard.css';

const STATS = [
  { icon: <MdBedroomParent />, label: 'Total Rooms',    value: '24',  sub: '18 Occupied · 6 Vacant',  color: '#6C63FF', trend: '2 this month', trendUp: true },
  { icon: <MdPeople />,        label: 'Total Tenants',  value: '18',  sub: '3 new this month',          color: '#00C897', trend: '3 added',     trendUp: true },
  { icon: <FaRupeeSign />,     label: 'Rent Collected', value: '₹72K', sub: 'Out of ₹90K expected',    color: '#FFB648', trend: '₹18K pending', trendUp: false },
  { icon: <MdSecurity />,      label: 'Today Visitors', value: '7',   sub: '3 pending approval',        color: '#FF6584', trend: '',             trendUp: true },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'payment',   icon: <MdCheckCircle />, color: '#00C897', text: 'Rent paid by Priya Sharma — Room 204', time: '10 mins ago' },
  { id: 2, type: 'visitor',   icon: <MdSecurity />,    color: '#6C63FF', text: 'Visitor request: Rahul for Room 101',   time: '25 mins ago' },
  { id: 3, type: 'complaint', icon: <MdWarning />,     color: '#FFB648', text: 'Complaint: AC not working in Room 305',  time: '1 hr ago' },
  { id: 4, type: 'tenant',    icon: <MdPersonAdd />,   color: '#00B4D8', text: 'New tenant: Aman Gupta added to Room 106', time: '3 hrs ago' },
  { id: 5, type: 'payment',   icon: <MdCheckCircle />, color: '#00C897', text: 'Rent paid by Karan Mehta — Room 302',   time: '5 hrs ago' },
  { id: 6, type: 'complaint', icon: <MdWarning />,     color: '#FF6584', text: 'Complaint: Water leakage in Room 201',  time: '1 day ago' },
];

const ROOM_OVERVIEW = [
  { floor: 'Floor 1', total: 6, occupied: 5, vacant: 1 },
  { floor: 'Floor 2', total: 6, occupied: 6, vacant: 0 },
  { floor: 'Floor 3', total: 6, occupied: 4, vacant: 2 },
  { floor: 'Floor 4', total: 6, occupied: 3, vacant: 3 },
];

export default function AdminDashboard() {
  return (
    <div className="page-content fade-in">
      {/* Header */}
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening in your PG today.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="card dashboard-activity">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <span className="badge badge-primary">Live</span>
          </div>
          <div className="activity-list">
            {RECENT_ACTIVITY.map(a => (
              <div key={a.id} className="activity-item">
                <div className="activity-icon" style={{ background: `${a.color}22`, color: a.color }}>
                  {a.icon}
                </div>
                <div className="activity-body">
                  <p>{a.text}</p>
                  <span>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Overview */}
        <div className="card dashboard-rooms">
          <div className="card-header">
            <h3 className="card-title">Room Overview</h3>
            <span className="badge badge-info">By Floor</span>
          </div>
          <div className="room-floors">
            {ROOM_OVERVIEW.map((f, i) => {
              const pct = Math.round((f.occupied / f.total) * 100);
              return (
                <div key={i} className="floor-row">
                  <div className="floor-row__info">
                    <span className="floor-row__name">{f.floor}</span>
                    <span className="floor-row__count">
                      <b style={{ color: 'var(--clr-success)' }}>{f.occupied}</b>/{f.total} rooms
                    </span>
                  </div>
                  <div className="floor-progress">
                    <div
                      className="floor-progress__fill"
                      style={{ width: `${pct}%`, background: pct === 100 ? 'var(--clr-danger)' : 'var(--clr-primary)' }}
                    />
                  </div>
                  <span className="floor-row__pct">{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Rent Summary Donut */}
          <div className="rent-summary">
            <div className="rent-summary__item">
              <span style={{ background: 'var(--clr-success)' }} />
              <div>
                <strong>₹72,000</strong>
                <p>Collected</p>
              </div>
            </div>
            <div className="rent-summary__divider" />
            <div className="rent-summary__item">
              <span style={{ background: 'var(--clr-warning)' }} />
              <div>
                <strong>₹18,000</strong>
                <p>Pending</p>
              </div>
            </div>
            <div className="rent-summary__divider" />
            <div className="rent-summary__item">
              <span style={{ background: 'var(--clr-primary)' }} />
              <div>
                <strong>₹90,000</strong>
                <p>Total Due</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
