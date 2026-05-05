import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdPhone, MdEmail, MdPeople } from 'react-icons/md';
import Modal from '../../components/admin/Modal';

const INITIAL_TENANTS = [
  { id: 1, name: 'Aman Gupta',    email: 'aman@email.com',   phone: '9876543210', room: '101', moveIn: '2024-01-15', rent: 8000, status: 'Active',   emergency: 'Ramesh Gupta (Father)' },
  { id: 2, name: 'Priya Sharma',  email: 'priya@email.com',  phone: '9812345678', room: '102', moveIn: '2024-02-01', rent: 6000, status: 'Active',   emergency: 'Sunita Sharma (Mother)' },
  { id: 3, name: 'Karan Mehta',   email: 'karan@email.com',  phone: '9834567890', room: '201', moveIn: '2024-01-20', rent: 5000, status: 'Active',   emergency: 'Vijay Mehta (Father)' },
  { id: 4, name: 'Sana Khan',     email: 'sana@email.com',   phone: '9845678901', room: '202', moveIn: '2024-03-10', rent: 6500, status: 'Active',   emergency: 'Ayesha Khan (Sister)' },
  { id: 5, name: 'Rohit Das',     email: 'rohit@email.com',  phone: '9856789012', room: '301', moveIn: '2023-12-01', rent: 6000, status: 'Active',   emergency: 'Suresh Das (Father)' },
  { id: 6, name: 'Neha Singh',    email: 'neha@email.com',   phone: '9867890123', room: '401', moveIn: '2024-04-01', rent: 7500, status: 'Inactive', emergency: 'Rajiv Singh (Brother)' },
];

const EMPTY_FORM = { name: '', email: '', phone: '', room: '', moveIn: '', rent: '', emergency: '', status: 'Active' };

export default function TenantManagement() {
  const [tenants, setTenants] = useState(INITIAL_TENANTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewTenant, setViewTenant] = useState(null);

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search)
  );

  const openAdd  = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit = (t) => { setForm({ ...t, rent: String(t.rent) }); setEditId(t.id); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editId) {
      setTenants(prev => prev.map(t => t.id === editId ? { ...t, ...form, rent: Number(form.rent) } : t));
    } else {
      setTenants(prev => [...prev, { id: Date.now(), ...form, rent: Number(form.rent) }]);
    }
    setShowModal(false);
  };

  const getAvatar = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarColors = ['#6C63FF','#00C897','#FFB648','#FF6584','#00B4D8','#9b59b6'];

  return (
    <div className="page-content fade-in">
      <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <h1>Tenant Management</h1>
          <p>Manage all tenants, contact info, and room assignments.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="add-tenant-btn">
          <MdAdd /> Add Tenant
        </button>
      </div>

      {/* Summary bar */}
      <div className="room-quick-stats">
        <div className="room-quick-stat">
          <MdPeople style={{ color: 'var(--clr-primary)', fontSize: '1.4rem' }} />
          <div><strong>{tenants.length}</strong><span>Total Tenants</span></div>
        </div>
        <div className="room-quick-stat">
          <div className="room-dot" style={{ background: 'var(--clr-success)' }} />
          <div><strong>{tenants.filter(t => t.status === 'Active').length}</strong><span>Active</span></div>
        </div>
        <div className="room-quick-stat">
          <div className="room-dot" style={{ background: 'var(--clr-danger)' }} />
          <div><strong>{tenants.filter(t => t.status === 'Inactive').length}</strong><span>Inactive</span></div>
        </div>
      </div>

      {/* Search */}
      <div className="table-toolbar">
        <div className="navbar__search" style={{ maxWidth: 300 }}>
          <MdSearch style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }} />
          <input
            className="navbar__search-input"
            placeholder="Search name, email, room…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="tenant-search-input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Tenant</th><th>Contact</th><th>Room</th>
                <th>Move-in</th><th>Rent/mo</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No tenants found</td></tr>
              ) : filtered.map((t, idx) => (
                <tr key={t.id}>
                  <td>
                    <div className="flex gap-sm" style={{ alignItems: 'center' }}>
                      <div className="tenant-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                        {getAvatar(t.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.emergency}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>
                      <div className="flex gap-sm" style={{ alignItems: 'center', color: 'var(--text-secondary)' }}>
                        <MdEmail style={{ fontSize: '0.9rem' }} />{t.email}
                      </div>
                      <div className="flex gap-sm" style={{ alignItems: 'center', color: 'var(--text-muted)', marginTop: 2 }}>
                        <MdPhone style={{ fontSize: '0.9rem' }} />{t.phone}
                      </div>
                    </div>
                  </td>
                  <td><div className="room-number-badge">#{t.room}</div></td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.moveIn}</td>
                  <td style={{ color: 'var(--clr-success)', fontWeight: 600 }}>₹{t.rent.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${t.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{t.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-sm">
                      <button className="action-btn action-btn--edit" onClick={() => openEdit(t)} id={`edit-tenant-${t.id}`} title="Edit"><MdEdit /></button>
                      <button className="action-btn action-btn--delete" onClick={() => setDeleteConfirm(t.id)} id={`delete-tenant-${t.id}`} title="Delete"><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? 'Edit Tenant' : 'Add New Tenant'} id="tenant-form-modal">
        <form onSubmit={handleSave}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-control" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Aman Gupta" id="tenant-name-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-control" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="email@example.com" id="tenant-email-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className="form-control" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required placeholder="10-digit number" id="tenant-phone-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Room Number *</label>
              <input className="form-control" value={form.room} onChange={e => setForm(p => ({ ...p, room: e.target.value }))} required placeholder="e.g. 101" id="tenant-room-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Move-in Date *</label>
              <input className="form-control" type="date" value={form.moveIn} onChange={e => setForm(p => ({ ...p, moveIn: e.target.value }))} required id="tenant-movein-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Rent (₹) *</label>
              <input className="form-control" type="number" value={form.rent} onChange={e => setForm(p => ({ ...p, rent: e.target.value }))} required placeholder="e.g. 7500" id="tenant-rent-input" />
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Emergency Contact</label>
              <input className="form-control" value={form.emergency} onChange={e => setForm(p => ({ ...p, emergency: e.target.value }))} placeholder="Name & relationship" id="tenant-emergency-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} id="tenant-status-select">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-sm" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-md)' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="tenant-save-btn">{editId ? 'Save Changes' : 'Add Tenant'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Remove Tenant" size="sm" id="tenant-delete-modal">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>Are you sure you want to remove this tenant? Their room will be marked as vacant.</p>
        <div className="flex gap-sm" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => { setTenants(p => p.filter(t => t.id !== deleteConfirm)); setDeleteConfirm(null); }} id="tenant-delete-confirm-btn">Remove</button>
        </div>
      </Modal>
    </div>
  );
}
