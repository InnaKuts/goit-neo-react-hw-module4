import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ErrorContext } from "./ErrorContext";

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
