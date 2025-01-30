import 'next-auth';
import { CompanyRole } from './company/company.type';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    image: string | null;
    companyId: string;
    companyRole: CompanyRole;
    companySubdomain: string;
  }

  interface Session {
    user: User;
    expires: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    accessToken?: string;
    companyId: string;
    companySubdomain: string;
  }
}
