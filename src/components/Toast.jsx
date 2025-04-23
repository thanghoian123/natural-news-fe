import React, { useEffect } from 'react';
import {
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const toastTypes = {
  success: { icon: CheckCircleIcon, bgColor: 'bg-green-600', textColor: 'text-white' },
  error: { icon: XCircleIcon, bgColor: 'bg-red-600', textColor: 'text-white' },
  warning: { icon: ExclamationCircleIcon, bgColor: 'bg-yellow-600', textColor: 'text-white' },
  info: { icon: InformationCircleIcon, bgColor: 'bg-blue-600', textColor: 'text-white' },
};

const Toast = ({ message, type = 'info', onClose }) => {
  const { icon: Icon, bgColor, textColor } = toastTypes[type] || toastTypes.info;

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center p-4 ${bgColor} ${textColor} rounded-lg shadow-lg fixed top-5 right-5 z-50`}
    >
      <Icon className="w-6 h-6 mr-3" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
