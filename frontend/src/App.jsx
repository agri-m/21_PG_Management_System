import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// ── Placeholder pages (will be replaced phase by phase) ──────────────────────
const ComingSoon = ({ label }) => (
  <div className="coming-soon">
    <div className="coming-soon-card">
      <span className="coming-soon-icon">🚧</span>
      <h2>{label}</h2>
      <p>This page will be built in the next phase.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin */}
        <Route path="/admin/dashboard"  element={<ComingSoon label="Admin Dashboard" />} />
        <Route path="/admin/rooms"       element={<ComingSoon label="Room Management" />} />
        <Route path="/admin/tenants"     element={<ComingSoon label="Tenant Management" />} />
        <Route path="/admin/rent"        element={<ComingSoon label="Rent Dashboard" />} />
        <Route path="/admin/visitors"    element={<ComingSoon label="Visitor Approval" />} />

        {/* Tenant */}
        <Route path="/tenant/dashboard"  element={<ComingSoon label="Tenant Dashboard" />} />
        <Route path="/tenant/payment"    element={<ComingSoon label="Payment Upload" />} />
        <Route path="/tenant/complaint"  element={<ComingSoon label="Complaint Form" />} />

        {/* Guard */}
        <Route path="/guard/dashboard"   element={<ComingSoon label="Guard Dashboard" />} />
        <Route path="/guard/visitors"    element={<ComingSoon label="Visitor Entry" />} />

        {/* Auth */}
        <Route path="/login"             element={<ComingSoon label="Login" />} />

        {/* 404 */}
        <Route path="*" element={<ComingSoon label="404 – Page Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
