import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/organisms/appSidebar/app-sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <AppSidebar />
            <main className={`w-full flex flex-col gap-4 p-6`}>{children}</main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
