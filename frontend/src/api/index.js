import api from './api';

// This is where all backend API calls would be defined to interface with the Spring Boot backend.
// Examples of what these endpoints would look like in Phase 8 (API Integration).

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const adminAPI = {
  // Rooms
  getRooms: () => api.get('/rooms'),
  createRoom: (data) => api.post('/rooms', data),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}`),

  // Tenants
  getTenants: () => api.get('/tenants'),
  createTenant: (data) => api.post('/tenants', data),
  
  // Dashboard Stats
  getDashboardStats: () => api.get('/stats/dashboard'),
};

export const tenantAPI = {
  getRoomDetails: () => api.get('/tenant/room'),
  getRentHistory: () => api.get('/tenant/rent-history'),
  submitComplaint: (data) => api.post('/complaints', data),
  uploadPaymentReceipt: (formData) => api.post('/payments/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const guardAPI = {
  getTodayVisitors: () => api.get('/visitors/today'),
  logEntry: (data) => api.post('/visitors/entry', data),
  logExit: (id, exitTime) => api.put(`/visitors/${id}/exit`, { exitTime }),
};
