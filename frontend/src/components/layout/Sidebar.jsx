import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard, MdBedroomParent, MdPeople, MdPayments,
  MdSecurity, MdVisibility, MdFeedback, MdMenu, MdClose,
  MdHome, MdAdminPanelSettings, MdChevronRight
} from 'react-icons/md';
import { FaBuilding, FaShieldAlt, FaUser } from 'react-icons/fa';
import './Sidebar.css';

const NAV_SECTIONS = [
  {
    role: 'Admin',
    icon: <MdAdminPanelSettings />,
    color: '#6C63FF',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard',    icon: <MdDashboard /> },
      { path: '/admin/rooms',     label: 'Rooms',        icon: <MdBedroomParent /> },
      { path: '/admin/tenants',   label: 'Tenants',      icon: <MdPeople /> },
      { path: '/admin/rent',      label: 'Rent',         icon: <MdPayments /> },
      { path: '/admin/visitors',  label: 'Visitors',     icon: <MdVisibility /> },
    ],
  },
  {
    role: 'Tenant',
    icon: <FaUser />,
    color: '#00C897',
    items: [
      { path: '/tenant/dashboard', label: 'My Room',    icon: <MdHome /> },
      { path: '/tenant/payment',   label: 'Pay Rent',   icon: <MdPayments /> },
      { path: '/tenant/complaint', label: 'Complaint',  icon: <MdFeedback /> },
    ],
  },
  {
    role: 'Guard',
    icon: <FaShieldAlt />,
    color: '#FFB648',
    items: [
      { path: '/guard/dashboard', label: 'Overview',      icon: <MdDashboard /> },
      { path: '/guard/visitors',  label: 'Visitor Entry', icon: <MdSecurity /> },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const [expandedRole, setExpandedRole] = useState('Admin');

  const toggleRole = (role) => {
    setExpandedRole(prev => prev === role ? null : role);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <FaBuilding />
        </div>
        {!collapsed && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-title">PG Manager</span>
            <span className="sidebar__logo-sub">v1.0</span>
          </div>
        )}
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          id="sidebar-toggle-btn"
        >
          {collapsed ? <MdMenu /> : <MdClose />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {NAV_SECTIONS.map((section) => {
          const isExpanded = expandedRole === section.role;
          const hasActive = section.items.some(i => location.pathname.startsWith(i.path));

          return (
            <div key={section.role} className="sidebar__section">
              {/* Section Header */}
              <button
                className={`sidebar__section-header ${hasActive ? 'sidebar__section-header--active' : ''}`}
                onClick={() => !collapsed && toggleRole(section.role)}
                style={{ '--role-color': section.color }}
                id={`sidebar-section-${section.role.toLowerCase()}`}
              >
                <span className="sidebar__section-icon" style={{ color: section.color }}>
                  {section.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="sidebar__section-label">{section.role}</span>
                    <span className={`sidebar__section-arrow ${isExpanded ? 'sidebar__section-arrow--open' : ''}`}>
                      <MdChevronRight />
                    </span>
                  </>
                )}
              </button>

              {/* Items */}
              <div className={`sidebar__items ${(isExpanded || collapsed) ? 'sidebar__items--visible' : ''}`}>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    id={`nav-${item.path.replace(/\//g, '-').slice(1)}`}
                    className={({ isActive }) =>
                      `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sidebar__item-icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar__item-label">{item.label}</span>}
                    {!collapsed && (
                      <span className="sidebar__item-indicator" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="sidebar__footer">
          <div className="sidebar__footer-status">
            <span className="sidebar__status-dot" />
            <span>System Online</span>
          </div>
        </div>
      )}
    </aside>
  );
}
