import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type MutationContextType = {
  isScrambled: boolean;
  toggleScramble: () => void;
};

const MutationContext = createContext<MutationContextType | null>(null);

export function MutationProvider({ children }: { children: ReactNode }) {
  const [isScrambled, setIsScrambled] = useState(false);
  const toggleScramble = () => setIsScrambled(!isScrambled);

  return (
    <MutationContext.Provider value={{ isScrambled, toggleScramble }}>
      {children}
    </MutationContext.Provider>
  );
}

export function useMutation() {
  const ctx = useContext(MutationContext);
  if (!ctx) throw new Error("useMutation must be used within MutationProvider");
  return ctx;
}

export function useUIProps(baseId: string, baseText: string, altText?: string) {
  const { isScrambled } = useMutation();
  
  // Hash the ID slightly but keep it stable for the lifespan of the isScrambled mode
  const idValue = useMemo(() => {
    if (!isScrambled) return baseId;
    return `qa_${btoa(baseId).replace(/=/g, '').toLowerCase().substring(0, 6)}_${Math.random().toString(36).substring(2, 6)}`;
  }, [isScrambled, baseId]);

  return {
    id: idValue,
    'data-testid': isScrambled ? undefined : baseId,
    text: isScrambled ? (altText || baseText) : baseText,
  };
}
