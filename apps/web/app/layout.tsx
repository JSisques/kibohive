import './globals.css';
import Providers from '@/provider';
import TaskSidebar from '@/components/organisms/app-sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { geistMono, geistSans, inter } from './metadata';
import { CompanyInitializer } from '@/components/providers/company-initializer';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
          <CompanyInitializer />
          <TaskSidebar />
          <main className="p-6 w-full flex flex-col gap-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
