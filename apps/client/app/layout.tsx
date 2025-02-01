import { ClerkProvider, useUser } from '@clerk/nextjs';
import './globals.css';
import AppSidebar from '@/components/organisms/appSidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <AppSidebar />
            <main className={`w-full flex flex-col gap-4 p-4`}>{children}</main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
