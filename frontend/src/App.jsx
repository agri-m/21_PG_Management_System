import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import './App.css';

// Auth
import Login from './pages/auth/Login';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import RoomManagement from './pages/admin/RoomManagement';
import TenantManagement from './pages/admin/TenantManagement';
import RentDashboard from './pages/admin/RentDashboard';
import VisitorApproval from './pages/admin/VisitorApproval';

// Tenant
import TenantDashboard from './pages/tenant/TenantDashboard';
import PaymentUpload from './pages/tenant/PaymentUpload';
import ComplaintForm from './pages/tenant/ComplaintForm';

// Guard
import GuardDashboard from './pages/guard/GuardDashboard';
import VisitorEntry from './pages/guard/VisitorEntry';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth pages (no layout) */}
        <Route path="/login" element={<Login />} />

        {/* ── All layout routes ── */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Admin */}
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/rooms"      element={<RoomManagement />} />
                <Route path="admin/tenants"    element={<TenantManagement />} />
                <Route path="admin/rent"       element={<RentDashboard />} />
                <Route path="admin/visitors"   element={<VisitorApproval />} />

                {/* Tenant */}
                <Route path="tenant/dashboard" element={<TenantDashboard />} />
                <Route path="tenant/payment"   element={<PaymentUpload />} />
                <Route path="tenant/complaint" element={<ComplaintForm />} />

                {/* Guard */}
                <Route path="guard/dashboard"  element={<GuardDashboard />} />
                <Route path="guard/visitors"   element={<VisitorEntry />} />

                {/* 404 */}
                <Route path="*" element={
                  <div className="page-content fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <h2>404 - Page Not Found</h2>
                  </div>
                } />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
