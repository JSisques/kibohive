import './globals.css';
import Providers from '@/provider';
import TaskSidebar from '@/components/organisms/app-sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { geistMono, geistSans, inter } from './metadata';
import { graphqlClient } from '@/lib/apollo-client';
import { getCompanyBySubdomain } from '@/lib/graphql/company/query';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <TaskSidebar />
          <main className="p-6 w-full flex flex-col gap-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
