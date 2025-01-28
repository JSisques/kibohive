'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyContextType {
  currentCompany: string | null;
  setCurrentCompany: (company: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [currentCompany, setCurrentCompany] = useState<string | null>(null);

  return <CompanyContext.Provider value={{ currentCompany, setCurrentCompany }}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany debe ser usado dentro de un CompanyProvider');
  }
  return context;
}
