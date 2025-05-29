import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare, hash } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { prisma } from '@prisma/prisma-client';
import crypto from 'crypto';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: UserRole.USER,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('Credentials are missing');
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          console.error(
            `User not found or password missing for email: ${credentials.email}`
          );
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          console.error('Invalid password');
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
          image: user.avatar || null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 часа
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) {
          console.error('User email is missing');
          return false;
        }

        // Для CredentialsProvider просто возвращаем true, так как authorize уже проверил данные
        if (account?.provider === 'credentials') {
          return true;
        }

        // Для OAuth-провайдеров (Google, GitHub)
        const findUser = await prisma.user.findFirst({
          where: {
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
              avatar: user.image || findUser.avatar,
              fullName: user.name || findUser.fullName,
            },
          });
          return true;
        }

        // Создаем нового пользователя для OAuth
        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: await hash(crypto.randomUUID(), 10), // Случайный пароль
            provider: account?.provider,
            providerId: account?.providerAccountId,
            role: UserRole.USER,
            avatar: user.image || null,
          },
        });

        return true;
      } catch (error) {
        console.error('Error [SIGNIN]', error);
        if (
          error instanceof Error &&
          error.message.includes('Unique constraint')
        ) {
          return '/auth/error?error=EmailAlreadyExists';
        }
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      // Обновление токена при вызове updateSession()
      if (trigger === 'update' && session?.user) {
        token.role = session.user.role;
        token.image = session.user.image;
        token.fullName = session.user.name;
      }

      // При первом входе добавляем данные в токен
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.name;
        token.role = user.role;
        token.image = user.image;
      }

      // Обновляем данные из БД только если необходимо
      if (token.email && (!token.id || trigger === 'update')) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            role: true,
            avatar: true,
            fullName: true,
            email: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id.toString();
          token.role = dbUser.role;
          token.image = dbUser.avatar;
          token.fullName = dbUser.fullName;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.fullName as string | null;
        session.user.role = token.role as UserRole;
        session.user.image = token.image as string | null;
      }

      return session;
    },
  },
};

export async function updateUserAndSession(
  userId: number,
  updateData: {
    role?: UserRole;
    avatar?: string | null;
    fullName?: string;
  }
) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      role: true,
      avatar: true,
      fullName: true,
    },
  });

  return {
    user: {
      id: updatedUser.id.toString(),
      name: updatedUser.fullName,
      role: updatedUser.role,
      image: updatedUser.avatar || null,
    },
  };
}
