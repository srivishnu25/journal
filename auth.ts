import { JSX } from "react";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";
import { GithubIcon, GoogleIcon } from "./app/ui/icons";
import { DefaultSession } from "next-auth";
import prisma from "@/app/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [Google, GitHub];
export const ProvidersIcon: Record<"google" | "github", () => JSX.Element> = {
  google: GoogleIcon,
  github: GithubIcon,
};

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return {
        id: provider.id,
        name: provider.name,
      };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Check if user exists using Prisma
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create new user using Prisma
          await prisma.user.create({
            data: {
              id: user.id,
              name: user.name ?? "",
              email: user.email,
              image: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error handling sign in:", error);
        return false;
      }
    },
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true },
        });
        session.user.id = dbUser?.id ?? "";
      }
      return session;
    },
  },
});

export async function getUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Use Prisma to find the user by email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user?.id) throw new Error("User not found");
  return user?.id;
}
