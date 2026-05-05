import './StatCard.css';

export default function StatCard({ icon, label, value, sub, color = '#6C63FF', trend, trendUp }) {
  return (
    <div className="stat-card" style={{ '--card-color': color }}>
      <div className="stat-card__icon" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <div className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">{value}</span>
        {sub && <span className="stat-card__sub">{sub}</span>}
      </div>
      {trend && (
        <div className={`stat-card__trend ${trendUp ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
      <div className="stat-card__glow" style={{ background: color }} />
    </div>
  );
}
