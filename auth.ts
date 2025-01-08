import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

const providers: Provider[] = [
  // Credentials({
  //   async authorize(credentials) {
  //     const parsedCredentials = z
  //       .object({
  //         email: z.string().email(),
  //         password: z.string().min(6),
  //       })
  //       .safeParse(credentials);
  //     if (parsedCredentials.success) {
  //       const { email, password } = parsedCredentials.data;
  //       const user = await getUser(email);
  //       if (!user) return null;
  //       const passwordsMatch = await bcrypt.compare(password, user.password);

  //       if (passwordsMatch) return user;
  //     }

  //     return null;
  //   },
  // }),
  Google,
  GitHub,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  // providers,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    ...providers,
  ],
});
