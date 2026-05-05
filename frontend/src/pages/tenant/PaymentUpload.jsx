import { useState, useRef } from 'react';
import { MdCloudUpload, MdAttachFile, MdCheckCircle, MdPayments } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import './PaymentUpload.css';

const MONTHS = ['January 2026','February 2026','March 2026','April 2026','May 2026','June 2026'];

export default function PaymentUpload() {
  const [form, setForm] = useState({ month: 'May 2026', amount: '8000', method: 'UPI', transactionId: '', notes: '' });
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => { if (f) setFile(f); };
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm(p => ({ ...p, transactionId: '', notes: '' }));
    setFile(null);
  };

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <h1>Pay Rent</h1>
        <p>Upload your payment receipt for verification by admin.</p>
      </div>

      {submitted && (
        <div className="alert alert-success" id="payment-success-alert">
          <MdCheckCircle style={{ fontSize: '1.2rem' }} />
          Payment receipt submitted successfully! Admin will verify within 24 hours.
        </div>
      )}

      <div className="payment-layout">
        {/* Form */}
        <form className="card" onSubmit={handleSubmit} id="payment-form">
          <div className="card-header">
            <h3 className="card-title">Payment Details</h3>
            <span className="badge badge-warning">Due: ₹8,000</span>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Rent Month *</label>
              <select className="form-control" value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))} id="payment-month-select">
                {MONTHS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₹) *</label>
              <div className="input-with-icon">
                <FaRupeeSign className="input-icon" />
                <input className="form-control" type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} required id="payment-amount-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Payment Method *</label>
              <select className="form-control" value={form.method} onChange={e => setForm(p => ({ ...p, method: e.target.value }))} id="payment-method-select">
                {['UPI', 'Bank Transfer', 'Cash', 'Cheque', 'NEFT/RTGS'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Transaction ID</label>
              <input className="form-control" value={form.transactionId} onChange={e => setForm(p => ({ ...p, transactionId: e.target.value }))} placeholder="e.g. UPI/TXN/12345" id="payment-txn-input" />
            </div>
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">Upload Receipt *</label>
            <div
              className={`upload-zone ${dragOver ? 'upload-zone--drag' : ''} ${file ? 'upload-zone--has-file' : ''}`}
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              id="payment-upload-zone"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])}
                id="payment-file-input"
              />
              {file ? (
                <div className="upload-zone__file">
                  <MdAttachFile style={{ fontSize: '2rem', color: 'var(--clr-success)' }} />
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB · Click to change</span>
                  </div>
                </div>
              ) : (
                <div className="upload-zone__empty">
                  <div className="upload-zone__icon"><MdCloudUpload /></div>
                  <p>Drag & drop or <span style={{ color: 'var(--clr-primary-light)', fontWeight: 600 }}>browse file</span></p>
                  <span>PNG, JPG, PDF up to 10MB</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea className="form-control" rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any additional information for admin…" id="payment-notes-input" style={{ resize: 'vertical' }} />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} id="payment-submit-btn">
            <MdPayments /> Submit Payment
          </button>
        </form>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="card payment-info-card">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-md)' }}>Payment Summary</h3>
            <div className="payment-summary-row"><span>Room</span><strong>#101</strong></div>
            <div className="payment-summary-row"><span>Rent Due</span><strong style={{ color: 'var(--clr-warning)' }}>₹8,000</strong></div>
            <div className="payment-summary-row"><span>Month</span><strong>{form.month}</strong></div>
            <div className="payment-summary-row"><span>Due Date</span><strong>5th May 2026</strong></div>
            <div className="divider" style={{ margin: 'var(--space-md) 0' }} />
            <div className="payment-summary-row"><span>Status</span><span className="badge badge-warning">Pending</span></div>
          </div>

          <div className="card payment-info-card">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-md)' }}>Payment Instructions</h3>
            {[
              'Transfer ₹8,000 to the UPI/bank details below',
              'Take a screenshot of the transaction',
              'Upload the receipt using the form',
              'Admin will confirm within 24 hours',
            ].map((step, i) => (
              <div key={i} className="instruction-step">
                <div className="instruction-num">{i + 1}</div>
                <p>{step}</p>
              </div>
            ))}
            <div className="upi-box">
              <span className="form-label">UPI ID</span>
              <strong>pg.manager@upi</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
