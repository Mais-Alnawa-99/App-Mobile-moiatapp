import React from 'react';
import {clearScope, ensureScope} from './TTSCollector';

export const TTSScopeContext = React.createContext<string | null>(null);

export function TTSScope({
  scopeId,
  children,
}: {
  scopeId: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    ensureScope(scopeId);
    return () => {
      clearScope(scopeId);
    };
  }, [scopeId]);

  return (
    <TTSScopeContext.Provider value={scopeId}>
      {children}
    </TTSScopeContext.Provider>
  );
}
