import React, {createContext, useState, useContext} from 'react';
import CustomToast from './CustomToast';

const ToastContext = createContext<{showToast: (message: string) => void}>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <CustomToast
        message={message}
        visible={visible}
        onHide={() => setVisible(false)}
      />
    </ToastContext.Provider>
  );
};
