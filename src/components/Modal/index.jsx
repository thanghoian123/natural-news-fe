import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, extraFooter, customActions }) {
  if (!isOpen) return null; // Ensure modal is only rendered when open

  return (
    <>
      {/* Backdrop with opacity */}
      <div className="fixed inset-0 bg-[#11111199] bg-opacity-50 z-50 flex items-center justify-center">
        <div className="relative p-4 w-fit min-w-md max-w-2xl bg-white dark:bg-[#252526] rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 rounded-lg p-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4">{children}</div>

          {/* Extra Footer Buttons (optional) */}
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

          {customActions || null}
        </div>
      </div>
    </>
  );
}
