'use client';

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/organisms/appSidebar/app-sidebar';
import { graphqlClient } from '@/lib/graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ApolloProvider client={graphqlClient}>
            <SidebarProvider>
              <div className="flex">
                <AppSidebar />
                <main className="w-full flex flex-col gap-4 p-6">{children}</main>
              </div>
            </SidebarProvider>
          </ApolloProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
