// DisabledContext.tsx
import React, {createContext, useContext} from 'react';

type DisabledContextType = {
  isDisabled: (fieldName: string) => boolean;
};

const DisabledContext = createContext<DisabledContextType | undefined>(
  undefined,
);

export const DisabledProvider = DisabledContext.Provider;

export const useDisabled = () => {
  const ctx = useContext(DisabledContext);
  if (!ctx) throw new Error('useDisabled must be used inside DisabledProvider');
  return ctx;
};
