import { SidebarProvider } from '@/components/ui/sidebar';
import { TeamProvider } from '@/context/team-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TeamProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </TeamProvider>
  );
}
