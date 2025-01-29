'use client';

import { Team } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TeamContextType {
  currentTeam: Team | null;
  setCurrentTeam: (team: Team) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  return <TeamContext.Provider value={{ currentTeam, setCurrentTeam }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam debe ser usado dentro de un TeamProvider');
  }
  return context;
}
