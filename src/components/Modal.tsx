import { useState, useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-strong w-full ${maxWidth} max-h-[90vh] overflow-y-auto animate-fade-in-up`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 rounded-t-2xl z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
