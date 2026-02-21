import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/login")({
  // beforeLoad: ({ context }) => {
  //   if (context.session) {
  //     throw redirect({ to: "/" });
  //   }
  // },
  component: Login,
});

async function signInGithub(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
  const { data, error } = await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
    errorCallbackURL: "/",
    newUserCallbackURL: "/",
    disableRedirect: false,
  });
  if (error) {
    console.log(error);
  }
}

function Login() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Sign In</h1>

      <div className="space-y-4">
        <form onSubmit={(e) => signInGithub(e)} method="POST">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-orange-500 px-4 py-3 text-white transition-colors hover:bg-orange-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z" />
            </svg>
            Continue with Auth0
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          You'll be redirected to Auth0 to complete the sign-in process.
        </p>
      </div>
    </div>
  );
}
