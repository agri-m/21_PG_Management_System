import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdLogin } from 'react-icons/md';
import { FaBuilding, FaUserShield, FaUser, FaShieldAlt } from 'react-icons/fa';
import './Login.css';

const ROLES = [
  { id: 'admin',  label: 'Admin',  icon: <FaUserShield />,  color: '#6C63FF', path: '/admin/dashboard',  desc: 'Full system access' },
  { id: 'tenant', label: 'Tenant', icon: <FaUser />,        color: '#00C897', path: '/tenant/dashboard', desc: 'Room & payments' },
  { id: 'guard',  label: 'Guard',  icon: <FaShieldAlt />,   color: '#FFB648', path: '/guard/dashboard',  desc: 'Visitor management' },
];

export default function Login() {
  const [role, setRole]         = useState('admin');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const selectedRole = ROLES.find(r => r.id === role);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(selectedRole.path);
    }, 1200);
  };

  return (
    <div className="login-page">
      {/* Background blobs */}
      <div className="login-blob login-blob--1" />
      <div className="login-blob login-blob--2" />

      <div className="login-card fade-in">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand__icon">
            <FaBuilding />
          </div>
          <div>
            <h1 className="login-brand__title">PG Manager</h1>
            <p className="login-brand__sub">Management System</p>
          </div>
        </div>

        <h2 className="login-heading">Welcome back</h2>
        <p className="login-sub">Sign in to your account to continue</p>

        {/* Role Selector */}
        <div className="login-roles">
          {ROLES.map(r => (
            <button
              key={r.id}
              type="button"
              className={`login-role ${role === r.id ? 'login-role--active' : ''}`}
              onClick={() => setRole(r.id)}
              style={{ '--role-color': r.color }}
              id={`login-role-${r.id}`}
            >
              <span className="login-role__icon" style={{ color: r.color }}>{r.icon}</span>
              <span className="login-role__label">{r.label}</span>
              <span className="login-role__desc">{r.desc}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <MdEmail className="input-icon" style={{ fontSize: '1rem' }} />
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder={`${role}@pgmanager.com`}
                id="login-email-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="flex-between">
              <label className="form-label">Password</label>
              <a href="#" className="login-forgot" id="login-forgot-link">Forgot password?</a>
            </div>
            <div className="input-with-icon">
              <MdLock className="input-icon" style={{ fontSize: '1rem' }} />
              <input
                className="form-control"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                id="login-password-input"
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                className="login-show-pass"
                onClick={() => setShowPass(p => !p)}
                id="login-toggle-pass"
                aria-label="Toggle password visibility"
              >
                {showPass ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg login-submit"
            disabled={loading}
            id="login-submit-btn"
            style={{ background: `linear-gradient(135deg, ${selectedRole.color}, ${selectedRole.color}bb)` }}
          >
            {loading ? (
              <span className="spinner" style={{ width: 20, height: 20, borderTopColor: '#fff' }} />
            ) : (
              <><MdLogin /> Sign In as {selectedRole.label}</>
            )}
          </button>
        </form>

        <p className="login-footer">
          PG Management System · All rights reserved © 2026
        </p>
      </div>
    </div>
  );
}
