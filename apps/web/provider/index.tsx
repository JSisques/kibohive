import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanyProvider } from '@/context/company-context';
import { TeamProvider } from '@/context/team-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProvider>
      <TeamProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </TeamProvider>
    </CompanyProvider>
  );
}
