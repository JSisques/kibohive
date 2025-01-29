import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    companyId: string;
    companyRole: CompanyRole;
  }

  interface Session {
    user: User;
  }
}
