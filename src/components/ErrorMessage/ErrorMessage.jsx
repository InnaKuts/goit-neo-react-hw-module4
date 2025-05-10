import { createContext, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const showError = (message) => {
    toast.error(message);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
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
