import { MdMenu, MdNotifications, MdSearch, MdAccountCircle, MdLightMode } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import './Navbar.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Room 101 rent is due tomorrow', time: '2m ago', type: 'warning' },
  { id: 2, text: 'Visitor request from Rahul', time: '15m ago', type: 'info' },
  { id: 3, text: 'Complaint resolved for Room 204', time: '1h ago', type: 'success' },
];

export default function Navbar({ onMenuClick, pageTitle }) {
  return (
    <header className="navbar" role="banner">
      {/* Left — hamburger (mobile) + page title */}
      <div className="navbar__left">
        <button
          className="navbar__hamburger"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          id="navbar-hamburger-btn"
        >
          <MdMenu />
        </button>
        <div className="navbar__title-wrap">
          <h1 className="navbar__title">{pageTitle || 'PG Management System'}</h1>
          <span className="navbar__breadcrumb">Dashboard</span>
        </div>
      </div>

      {/* Center — Search */}
      <div className="navbar__search-wrap">
        <div className="navbar__search" id="navbar-search">
          <MdSearch className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search rooms, tenants, visitors…"
            className="navbar__search-input"
            id="navbar-search-input"
          />
          <kbd className="navbar__search-kbd">⌘K</kbd>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="navbar__right">
        {/* Notification Bell */}
        <div className="navbar__notif-wrap">
          <button
            className="navbar__icon-btn"
            id="navbar-notification-btn"
            aria-label="Notifications"
          >
            <FaBell />
            <span className="navbar__notif-badge">3</span>
          </button>
          {/* Dropdown */}
          <div className="navbar__notif-dropdown" id="notif-dropdown">
            <div className="navbar__notif-header">
              <span>Notifications</span>
              <span className="navbar__notif-count">3 new</span>
            </div>
            {MOCK_NOTIFICATIONS.map(n => (
              <div key={n.id} className={`navbar__notif-item navbar__notif-item--${n.type}`}>
                <span className="navbar__notif-dot" />
                <div className="navbar__notif-body">
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
            <div className="navbar__notif-footer">View all notifications</div>
          </div>
        </div>

        {/* Divider */}
        <div className="navbar__divider" />

        {/* Avatar / Profile */}
        <button className="navbar__avatar-btn" id="navbar-profile-btn" aria-label="Profile menu">
          <div className="navbar__avatar">
            <MdAccountCircle />
          </div>
          <div className="navbar__avatar-info">
            <span className="navbar__avatar-name">Admin User</span>
            <span className="navbar__avatar-role">Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
}
