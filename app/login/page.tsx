import JournalLogo from "@/app/ui/journal-logo";
import { providerMap, ProviderNames, ProvidersIcon, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const SIGNIN_ERROR_URL = "/auth/error";

export default async function LoginPage(props: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl || "/journal";
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg p-3 md:h-36">
          <Link href="/" className="text-white w-48">
            <JournalLogo />
          </Link>
        </div>
        {/* <LoginForm key={"creds-form"} /> */}
        <div className="grid grid-cols-1 gap-3">
          {Object.values(providerMap).map((provider) => {
            const Icon =
              ProvidersIcon[provider.name.toLowerCase() as ProviderNames];
            return (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  try {
                    await signIn(provider.id, {
                      redirectTo: callbackUrl,
                    });
                  } catch (error) {
                    // Signin can fail for a number of reasons, such as the user
                    // not existing, or the user not having the correct role.
                    // In some cases, you may want to redirect to a custom error
                    if (error instanceof AuthError) {
                      return redirect(
                        `${SIGNIN_ERROR_URL}?error=${error.type}`
                      );
                    }

                    // Otherwise if a redirects happens Next.js can handle it
                    // so you can just re-thrown the error and let Next.js handle it.
                    // Docs:
                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                    throw error;
                  }
                }}
              >
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  <span className="flex gap-2">
                    Sign in with {provider.name}
                    <Icon />
                  </span>
                </Button>
              </form>
            );
          })}
        </div>
      </div>
    </main>
  );
}
