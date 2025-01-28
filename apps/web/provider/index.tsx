'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanyProvider } from '@/context/company-context';
import { TeamProvider } from '@/context/team-context';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProvider>
      <TeamProvider>
        <SessionProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </SessionProvider>
      </TeamProvider>
    </CompanyProvider>
  );
}
