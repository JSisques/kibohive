'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TeamContextType {
  currentTeam: string | null;
  setCurrentTeam: (team: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);

  return <TeamContext.Provider value={{ currentTeam, setCurrentTeam }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam debe ser usado dentro de un TeamProvider');
  }
  return context;
}
