import React, { createContext, useContext, useReducer } from 'react';
import { X, Flame, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const ToastContext = createContext();

const toastTypes = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-500',
    darkBg: 'dark:bg-green-800',
    darkText: 'dark:text-green-200',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-500',
    darkBg: 'dark:bg-red-800',
    darkText: 'dark:text-red-200',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-500',
    darkBg: 'dark:bg-yellow-800',
    darkText: 'dark:text-yellow-200',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    darkBg: 'dark:bg-blue-800',
    darkText: 'dark:text-blue-200',
  },
  default: {
    icon: Flame,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
    darkBg: 'dark:bg-blue-800',
    darkText: 'dark:text-blue-200',
  },
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload];
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = (message, type = 'default', duration = 3000) => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type, duration } });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map(({ id, message, type }) => {
          const {
            icon: Icon,
            bgColor,
            textColor,
            darkBg,
            darkText,
          } = toastTypes[type] || toastTypes.default;
          return (
            <div
              key={id}
              className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800`}
            >
              <div
                className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${textColor} ${bgColor} rounded-lg ${darkBg} ${darkText}`}
              >
                <Icon className="w-4 h-4" />
                <span className="sr-only">Icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">{message}</div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: id })}
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Close</span>
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
