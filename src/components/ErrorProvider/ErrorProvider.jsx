import { createContext, useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [persistentError, setPersistentError] = useState(null);

  const showError = (message, isPersistent = false) => {
    if (isPersistent) {
      setPersistentError(message);
    } else {
      toast.error(message);
    }
  };

  const clearPersistentError = () => {
    setPersistentError(null);
  };

  return (
    <ErrorContext.Provider
      value={{ showError, persistentError, clearPersistentError }}
    >
      <Toaster position="top-right" />
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
