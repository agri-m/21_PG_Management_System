import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import './App.css';

// ── Placeholder page (replaced phase by phase) ────────────────────
const ComingSoon = ({ label }) => (
  <div className="page-content fade-in">
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
    }}>
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-2xl)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-glow)',
        maxWidth: '400px',
      }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-md)' }}>🚧</span>
        <h2>{label}</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
          This page will be built in the next phase.
        </p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* ── All layout routes ── */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Admin */}
                <Route path="admin/dashboard" element={<ComingSoon label="Admin Dashboard" />} />
                <Route path="admin/rooms"      element={<ComingSoon label="Room Management" />} />
                <Route path="admin/tenants"    element={<ComingSoon label="Tenant Management" />} />
                <Route path="admin/rent"       element={<ComingSoon label="Rent Dashboard" />} />
                <Route path="admin/visitors"   element={<ComingSoon label="Visitor Approval" />} />

                {/* Tenant */}
                <Route path="tenant/dashboard" element={<ComingSoon label="Tenant Dashboard" />} />
                <Route path="tenant/payment"   element={<ComingSoon label="Payment Upload" />} />
                <Route path="tenant/complaint" element={<ComingSoon label="Complaint Form" />} />

                {/* Guard */}
                <Route path="guard/dashboard"  element={<ComingSoon label="Guard Dashboard" />} />
                <Route path="guard/visitors"   element={<ComingSoon label="Visitor Entry" />} />

                {/* 404 */}
                <Route path="*" element={<ComingSoon label="404 – Page Not Found" />} />
              </Routes>
            </MainLayout>
          }
        />

        {/* Auth pages (no layout) */}
        <Route path="/login" element={<ComingSoon label="Login" />} />
      </Routes>
    </Router>
  );
}

export default App;
