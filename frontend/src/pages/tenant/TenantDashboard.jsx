import { MdBedroomParent, MdWifi, MdAcUnit, MdBathtub, MdCheckCircle, MdWarning, MdHistory, MdPayments } from 'react-icons/md';
import { FaRupeeSign, FaBolt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TenantDashboard.css';

const TENANT = {
  name: 'Aman Gupta',
  room: '101',
  floor: 1,
  type: 'Single AC',
  rent: 8000,
  moveIn: '2024-01-15',
  amenities: ['AC', 'WiFi', 'Attached Bath', 'Balcony'],
};

const RENT_HISTORY = [
  { month: 'April 2026', amount: 8000, paid: '2026-04-29', status: 'Paid',    method: 'UPI' },
  { month: 'March 2026', amount: 8000, paid: '2026-03-31', status: 'Paid',    method: 'Bank Transfer' },
  { month: 'Feb 2026',   amount: 8000, paid: '2026-03-02', status: 'Late',    method: 'Cash' },
  { month: 'Jan 2026',   amount: 8000, paid: '2026-01-30', status: 'Paid',    method: 'UPI' },
];

const AMENITY_ICONS = {
  'AC':            <MdAcUnit />,
  'WiFi':          <MdWifi />,
  'Attached Bath': <MdBathtub />,
  'Balcony':       <FaBolt />,
};

export default function TenantDashboard() {
  const currentMonth = 'May 2026';
  const rentDue = true;

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Welcome, {TENANT.name} 👋</h1>
        <p>Here's an overview of your room and payments.</p>
      </div>

      <div className="tenant-dash-grid">
        {/* Room Card */}
        <div className="tenant-room-card card">
          <div className="tenant-room-card__header">
            <div className="tenant-room-card__icon">
              <MdBedroomParent />
            </div>
            <div>
              <h2 className="tenant-room-card__num">Room #{TENANT.room}</h2>
              <p className="tenant-room-card__type">{TENANT.type} · Floor {TENANT.floor}</p>
            </div>
            <span className="badge badge-success">Active</span>
          </div>

          <div className="tenant-room-card__body">
            <div className="tenant-room-stat">
              <FaRupeeSign style={{ color: 'var(--clr-success)' }} />
              <div><strong>₹{TENANT.rent.toLocaleString()}/mo</strong><span>Monthly Rent</span></div>
            </div>
            <div className="tenant-room-stat">
              <MdHistory style={{ color: 'var(--clr-info)' }} />
              <div><strong>{TENANT.moveIn}</strong><span>Move-in Date</span></div>
            </div>
          </div>

          <div className="tenant-room-card__amenities">
            <p className="tenant-amenity-label">Room Amenities</p>
            <div className="tenant-amenity-list">
              {TENANT.amenities.map((a, i) => (
                <div key={i} className="tenant-amenity-chip">
                  <span className="tenant-amenity-chip__icon">{AMENITY_ICONS[a] || <FaBolt />}</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {/* Rent Status Card */}
          <div className={`rent-status-card card ${rentDue ? 'rent-status-card--due' : 'rent-status-card--paid'}`}>
            <div className="rent-status-card__icon">
              {rentDue ? <MdWarning /> : <MdCheckCircle />}
            </div>
            <div className="rent-status-card__body">
              <h3>{rentDue ? `Rent Due — ${currentMonth}` : 'Rent Paid!'}</h3>
              <p>{rentDue ? 'Your rent payment is pending. Please pay before 5th May.' : 'All dues cleared for this month.'}</p>
              <div className="rent-status-card__amount">₹{TENANT.rent.toLocaleString()}</div>
            </div>
            {rentDue && (
              <Link to="/tenant/payment" className="btn btn-primary" id="pay-rent-quick-btn">
                <MdPayments /> Pay Now
              </Link>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              <Link to="/tenant/payment" className="quick-action" id="quick-pay-btn">
                <div className="quick-action__icon" style={{ background: 'rgba(0,200,151,0.15)', color: 'var(--clr-success)' }}>
                  <MdPayments />
                </div>
                <span>Pay Rent</span>
              </Link>
              <Link to="/tenant/complaint" className="quick-action" id="quick-complaint-btn">
                <div className="quick-action__icon" style={{ background: 'rgba(255,182,72,0.15)', color: 'var(--clr-warning)' }}>
                  <MdWarning />
                </div>
                <span>Complaint</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="card-title">Payment History</h3>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>Month</th><th>Amount</th><th>Paid On</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {RENT_HISTORY.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.month}</td>
                  <td style={{ color: 'var(--clr-success)', fontWeight: 600 }}>₹{r.amount.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.paid}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.method}</td>
                  <td>
                    <span className={`badge ${r.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
