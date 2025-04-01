import { NextAuthOptions, Session, User as AuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@/types/admin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await getUserByEmail(credentials.email);
        if (user) {
          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (isValid) {
            return { id: user.id, email: user.email, name: user.name };
          } else {
            throw new Error("Invalid email or password");
          }
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;

      return session;
    }
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [email]);
  if (result?.rowCount && result.rowCount > 0) {
    return result.rows[0];
  }

  return null;
}
