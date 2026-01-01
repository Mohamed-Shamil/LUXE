import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  addToast: () => console.warn('ToastContext used outside of Provider'),
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              layout
              className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]"
              style={{
                background: toast.type === 'error' ? 'rgba(220, 38, 38, 0.9)' : 
                            toast.type === 'info' ? 'rgba(37, 99, 235, 0.9)' : 
                            'rgba(20, 20, 20, 0.9)'
              }}
            >
              <div className={`p-1 rounded-full ${toast.type === 'error' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {toast.type === 'error' ? <XCircle size={18} /> : 
                   toast.type === 'info' ? <Info size={18} /> : 
                   <CheckCircle size={18} className="text-green-400" />}
              </div>
              <p className="font-medium text-sm flex-1">{toast.message}</p>
              <button 
                onClick={() => removeToast(toast.id)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
