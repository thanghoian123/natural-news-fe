import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, extraFooter, customActions }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 BlurBox backdrop"
        onClick={onClose} // Optional: close modal on backdrop click
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[520px] p-4 bg-white dark:bg-[#252526] rounded-lg shadow-lg ">
          {/* Modal Header */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6">
            <p className="text-[19px] font-semibold text-gray-900 dark:text-white font-700">
              {title}
            </p>

            {children}
          </div>

          {/* Optional Footer */}
          {extraFooter && (
            <div className="flex justify-end space-x-3 p-4 border-t">
              <button
                onClick={onClose}
                className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded-lg"
              >
                I accept
              </button>
              <button
                onClick={onClose}
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
              >
                Decline
              </button>
            </div>
          )}

          {/* Custom actions (if provided) */}
          {customActions}
        </div>
      </div>
    </div>
  );
}
