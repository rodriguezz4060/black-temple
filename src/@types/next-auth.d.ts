// types/next-auth.d.ts
import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name?: string | null;
      email: string;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    fullName?: string | null; // Добавлено для соответствия
    image?: string | null; // Добавлено для соответствия
  }
}
