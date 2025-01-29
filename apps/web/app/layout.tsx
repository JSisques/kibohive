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
  const session = await getServerSession(authOptions);
  const subdomain = process.env.NODE_ENV === 'development' ? 'hola.localhost' : process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost';

  const { data } = await graphqlClient.query({
    query: getCompanyBySubdomain,
    variables: { subdomain },
  });

  const company = data?.getCompanyBySubdomain;

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
