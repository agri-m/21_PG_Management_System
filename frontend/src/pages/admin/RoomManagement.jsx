import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdBedroomParent, MdSearch, MdFilterList } from 'react-icons/md';
import Modal from '../../components/admin/Modal';
import './RoomManagement.css';

const INITIAL_ROOMS = [
  { id: 1, number: '101', type: 'Single', floor: 1, status: 'Occupied', rent: 8000,  tenant: 'Aman Gupta',   amenities: ['AC', 'WiFi', 'Attached Bath'] },
  { id: 2, number: '102', type: 'Double', floor: 1, status: 'Occupied', rent: 6000,  tenant: 'Priya Sharma', amenities: ['WiFi', 'Shared Bath'] },
  { id: 3, number: '103', type: 'Single', floor: 1, status: 'Vacant',   rent: 7500,  tenant: '—',            amenities: ['AC', 'WiFi', 'Attached Bath'] },
  { id: 4, number: '201', type: 'Triple', floor: 2, status: 'Occupied', rent: 5000,  tenant: 'Karan Mehta',  amenities: ['WiFi', 'Shared Bath'] },
  { id: 5, number: '202', type: 'Double', floor: 2, status: 'Occupied', rent: 6500,  tenant: 'Sana Khan',    amenities: ['AC', 'WiFi'] },
  { id: 6, number: '203', type: 'Single', floor: 2, status: 'Vacant',   rent: 8500,  tenant: '—',            amenities: ['AC', 'WiFi', 'Balcony'] },
  { id: 7, number: '301', type: 'Double', floor: 3, status: 'Occupied', rent: 6000,  tenant: 'Rohit Das',    amenities: ['WiFi'] },
  { id: 8, number: '302', type: 'Single', floor: 3, status: 'Vacant',   rent: 7000,  tenant: '—',            amenities: ['AC', 'WiFi'] },
];

const EMPTY_FORM = { number: '', type: 'Single', floor: '1', status: 'Vacant', rent: '', amenities: '' };

export default function RoomManagement() {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = rooms.filter(r => {
    const matchSearch = r.number.includes(search) || r.tenant.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setEditRoom(null); setShowModal(true); };
  const openEdit = (room) => {
    setForm({ ...room, amenities: room.amenities.join(', ') });
    setEditRoom(room.id);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const amenitiesArr = form.amenities.split(',').map(a => a.trim()).filter(Boolean);
    if (editRoom) {
      setRooms(prev => prev.map(r => r.id === editRoom ? { ...r, ...form, floor: Number(form.floor), rent: Number(form.rent), amenities: amenitiesArr } : r));
    } else {
      setRooms(prev => [...prev, { id: Date.now(), ...form, floor: Number(form.floor), rent: Number(form.rent), amenities: amenitiesArr, tenant: '—' }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRooms(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const occupied = rooms.filter(r => r.status === 'Occupied').length;
  const vacant   = rooms.filter(r => r.status === 'Vacant').length;

  return (
    <div className="page-content fade-in">
      <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <h1>Room Management</h1>
          <p>Manage all rooms, types, and occupancy status.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd} id="add-room-btn">
          <MdAdd /> Add Room
        </button>
      </div>

      {/* Quick Stats */}
      <div className="room-quick-stats">
        <div className="room-quick-stat">
          <MdBedroomParent style={{ color: 'var(--clr-primary)', fontSize: '1.4rem' }} />
          <div><strong>{rooms.length}</strong><span>Total</span></div>
        </div>
        <div className="room-quick-stat">
          <div className="room-dot" style={{ background: 'var(--clr-success)' }} />
          <div><strong>{occupied}</strong><span>Occupied</span></div>
        </div>
        <div className="room-quick-stat">
          <div className="room-dot" style={{ background: 'var(--clr-warning)' }} />
          <div><strong>{vacant}</strong><span>Vacant</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="table-toolbar">
        <div className="navbar__search" style={{ maxWidth: 280 }}>
          <MdSearch style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }} />
          <input
            className="navbar__search-input"
            placeholder="Search rooms, tenants…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="room-search-input"
          />
        </div>
        <div className="filter-tabs">
          {['All', 'Occupied', 'Vacant'].map(s => (
            <button
              key={s}
              className={`filter-tab ${filterStatus === s ? 'filter-tab--active' : ''}`}
              onClick={() => setFilterStatus(s)}
              id={`filter-${s.toLowerCase()}`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Room</th><th>Type</th><th>Floor</th><th>Tenant</th>
                <th>Rent/mo</th><th>Amenities</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No rooms found</td></tr>
              ) : filtered.map(room => (
                <tr key={room.id}>
                  <td>
                    <div className="room-number-cell">
                      <div className="room-number-badge">#{room.number}</div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{room.type}</span></td>
                  <td style={{ color: 'var(--text-secondary)' }}>Floor {room.floor}</td>
                  <td style={{ fontWeight: 500 }}>{room.tenant}</td>
                  <td style={{ color: 'var(--clr-success)', fontWeight: 600 }}>₹{room.rent.toLocaleString()}</td>
                  <td>
                    <div className="amenity-tags">
                      {room.amenities.map((a, i) => <span key={i} className="amenity-tag">{a}</span>)}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${room.status === 'Occupied' ? 'badge-success' : 'badge-warning'}`}>
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-sm">
                      <button className="action-btn action-btn--edit" onClick={() => openEdit(room)} id={`edit-room-${room.id}`} title="Edit">
                        <MdEdit />
                      </button>
                      <button className="action-btn action-btn--delete" onClick={() => setDeleteConfirm(room.id)} id={`delete-room-${room.id}`} title="Delete">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editRoom ? 'Edit Room' : 'Add New Room'} id="room-form-modal">
        <form onSubmit={handleSave}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Room Number *</label>
              <input className="form-control" value={form.number} onChange={e => setForm(p => ({ ...p, number: e.target.value }))} required placeholder="e.g. 101" id="room-number-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Floor *</label>
              <select className="form-control" value={form.floor} onChange={e => setForm(p => ({ ...p, floor: e.target.value }))} id="room-floor-select">
                {[1,2,3,4].map(f => <option key={f} value={f}>Floor {f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Room Type *</label>
              <select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} id="room-type-select">
                {['Single','Double','Triple'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} id="room-status-select">
                <option>Vacant</option><option>Occupied</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Rent (₹) *</label>
              <input className="form-control" type="number" value={form.rent} onChange={e => setForm(p => ({ ...p, rent: e.target.value }))} required placeholder="e.g. 7500" id="room-rent-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Amenities (comma separated)</label>
              <input className="form-control" value={form.amenities} onChange={e => setForm(p => ({ ...p, amenities: e.target.value }))} placeholder="AC, WiFi, Attached Bath" id="room-amenities-input" />
            </div>
          </div>
          <div className="flex gap-sm" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-md)' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} id="room-cancel-btn">Cancel</button>
            <button type="submit" className="btn btn-primary" id="room-save-btn">{editRoom ? 'Save Changes' : 'Add Room'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Room" size="sm" id="delete-confirm-modal">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
          Are you sure you want to delete this room? This action cannot be undone.
        </p>
        <div className="flex gap-sm" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)} id="delete-cancel-btn">Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)} id="delete-confirm-btn">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
