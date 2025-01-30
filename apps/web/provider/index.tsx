'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanyProvider } from '@/context/company-context';
import { TeamProvider } from '@/context/team-context';
import { UserProvider } from '@/context/user-context';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children, session }: { children: React.ReactNode; session: any }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CompanyProvider>
          <TeamProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </TeamProvider>
        </CompanyProvider>
      </UserProvider>
    </SessionProvider>
  );
}
