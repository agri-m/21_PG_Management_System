import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './MainLayout.css';

// Map routes → readable page titles
const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/rooms':     'Room Management',
  '/admin/tenants':   'Tenant Management',
  '/admin/rent':      'Rent Dashboard',
  '/admin/visitors':  'Visitor Approval',
  '/tenant/dashboard':'My Room',
  '/tenant/payment':  'Pay Rent',
  '/tenant/complaint':'Submit Complaint',
  '/guard/dashboard': 'Guard Overview',
  '/guard/visitors':  'Visitor Entry',
};

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pageTitle = PAGE_TITLES[location.pathname] || 'PG Management System';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-layout">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
          id="mobile-sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(prev => !prev)}
        mobileOpen={mobileOpen}
      />

      {/* Main area */}
      <div className={`main-layout__body ${collapsed ? 'main-layout__body--expanded' : ''}`}>
        {/* Top Navbar */}
        <Navbar
          onMenuClick={() => setMobileOpen(prev => !prev)}
          pageTitle={pageTitle}
        />

        {/* Page content */}
        <main className="main-layout__content fade-in" id="main-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
