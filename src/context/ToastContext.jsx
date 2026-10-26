
import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer.jsx";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Remove a toast by its id
  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  // Add a toast and schedule its automatic dismissal
  const showToast = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = crypto.randomUUID();

      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type, duration },
      ]);

      setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

// useToast lets any component access toast functions without prop drilling.
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }

  return context;
}
