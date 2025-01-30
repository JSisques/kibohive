import './globals.css';
import Providers from '@/provider';
import TaskSidebar from '@/components/organisms/app-sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { geistMono, geistSans, inter } from './metadata';
import { CompanyInitializer } from '@/components/providers/company-initializer';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  console.log('pathname', pathname);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
          {!isAuthPage && (
            <>
              <CompanyInitializer />
              <TaskSidebar />
            </>
          )}
          <main className={`w-full flex flex-col gap-4 ${!isAuthPage ? 'p-6' : ''}`}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
