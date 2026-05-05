import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children, size = 'md', id }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id={id || 'modal-overlay'} role="dialog" aria-modal="true">
      <div
        className={`modal modal--${size} fade-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Close modal" id="modal-close-btn">
            <MdClose />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
