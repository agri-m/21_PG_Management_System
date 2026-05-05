import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MdPayments, MdCheckCircle, MdPending, MdWarning, MdSearch, MdFilterList } from 'react-icons/md';
import StatCard from '../../components/admin/StatCard';
import { FaRupeeSign } from 'react-icons/fa';
import './RentDashboard.css';

const RENT_DATA = [
  { month: 'Jan', collected: 82000, pending: 8000 },
  { month: 'Feb', collected: 75000, pending: 15000 },
  { month: 'Mar', collected: 88000, pending: 2000 },
  { month: 'Apr', collected: 70000, pending: 20000 },
  { month: 'May', collected: 72000, pending: 18000 },
];

const PIE_DATA = [
  { name: 'Paid',    value: 72000, color: '#00C897' },
  { name: 'Pending', value: 18000, color: '#FFB648' },
];

const RENT_RECORDS = [
  { id: 1, tenant: 'Aman Gupta',    room: '101', amount: 8000, due: '2026-05-01', paid: '2026-04-30', status: 'Paid',    method: 'UPI' },
  { id: 2, tenant: 'Priya Sharma',  room: '102', amount: 6000, due: '2026-05-01', paid: '2026-05-02', status: 'Paid',    method: 'Bank Transfer' },
  { id: 3, tenant: 'Karan Mehta',   room: '201', amount: 5000, due: '2026-05-01', paid: null,         status: 'Pending', method: '—' },
  { id: 4, tenant: 'Sana Khan',     room: '202', amount: 6500, due: '2026-05-01', paid: null,         status: 'Overdue', method: '—' },
  { id: 5, tenant: 'Rohit Das',     room: '301', amount: 6000, due: '2026-05-01', paid: '2026-05-01', status: 'Paid',    method: 'Cash' },
  { id: 6, tenant: 'Neha Singh',    room: '401', amount: 7500, due: '2026-05-01', paid: null,         status: 'Pending', method: '—' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function RentDashboard() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const paid    = RENT_RECORDS.filter(r => r.status === 'Paid').length;
  const pending = RENT_RECORDS.filter(r => r.status === 'Pending').length;
  const overdue = RENT_RECORDS.filter(r => r.status === 'Overdue').length;

  const filtered = RENT_RECORDS.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter;
    const matchSearch = r.tenant.toLowerCase().includes(search.toLowerCase()) || r.room.includes(search);
    return matchFilter && matchSearch;
  });

  const statusBadge = (s) => {
    if (s === 'Paid')    return 'badge-success';
    if (s === 'Pending') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Rent Dashboard</h1>
        <p>Track rent collection, pending payments, and monthly trends.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard icon={<FaRupeeSign />}     label="Total Collected"  value="₹72,000"  sub="May 2026"            color="#00C897" trend="+₹2K vs April" trendUp={true} />
        <StatCard icon={<MdPending />}       label="Pending Amount"   value="₹18,000"  sub={`${pending} tenants`} color="#FFB648" trend="↑ from last month" trendUp={false} />
        <StatCard icon={<MdWarning />}       label="Overdue"          value={`₹${RENT_RECORDS.filter(r=>r.status==='Overdue').reduce((a,b)=>a+b.amount,0).toLocaleString()}`} sub={`${overdue} tenant(s)`} color="#FF4757" />
        <StatCard icon={<MdCheckCircle />}   label="Paid Tenants"     value={`${paid}/${RENT_RECORDS.length}`} sub="this month" color="#6C63FF" trend="On track" trendUp={true} />
      </div>

      {/* Charts Row */}
      <div className="rent-charts-row">
        {/* Bar Chart */}
        <div className="card rent-bar-card">
          <div className="card-header">
            <h3 className="card-title">Monthly Trend</h3>
            <span className="badge badge-primary">Last 5 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={RENT_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#A0A3C4', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#A0A3C4', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="collected" name="Collected" fill="#00C897" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending"   name="Pending"   fill="#FFB648" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card rent-pie-card">
          <div className="card-header">
            <h3 className="card-title">May 2026</h3>
            <span className="badge badge-info">Breakdown</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-total">
            <p>Total Expected</p>
            <strong>₹90,000</strong>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 'var(--space-lg)' }}>
        <div style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="table-toolbar" style={{ margin: 0 }}>
            <div className="navbar__search" style={{ maxWidth: 260 }}>
              <MdSearch style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }} />
              <input className="navbar__search-input" placeholder="Search tenant, room…" value={search} onChange={e => setSearch(e.target.value)} id="rent-search-input" />
            </div>
            <div className="filter-tabs">
              {['All','Paid','Pending','Overdue'].map(s => (
                <button key={s} className={`filter-tab ${filter === s ? 'filter-tab--active' : ''}`} onClick={() => setFilter(s)} id={`rent-filter-${s.toLowerCase()}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>Tenant</th><th>Room</th><th>Amount</th><th>Due Date</th><th>Paid On</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.tenant}</td>
                  <td><div className="room-number-badge">#{r.room}</div></td>
                  <td style={{ fontWeight: 600, color: 'var(--clr-success)' }}>₹{r.amount.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.due}</td>
                  <td style={{ color: r.paid ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>{r.paid || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.method}</td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
