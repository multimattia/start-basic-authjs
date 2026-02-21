import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  // const { session } = Route.useRouteContext()
  const { data: session, error } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold">
        TanStack Start Auth.js Example
      </h1>
      <p className="mb-8 text-gray-600">
        This example demonstrates auth.js integration with TanStack Start using
        Auth0 OAuth.
      </p>

      <div className="rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">Auth Status</h2>

        {session ? (
          <div className="space-y-2">
            {error && (
              <div>
                <p className="text-red-900"></p>
              </div>
            )}
            <p className="font-medium text-green-600">Authenticated</p>
            {user?.image && (
              <img
                src={user.image}
                alt="Avatar"
                className="h-16 w-16 rounded-full"
              />
            )}
            <p>
              <strong>Name:</strong> {user?.name ?? "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email ?? "N/A"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">
            You are not signed in. Click "Sign In" in the navigation bar to
            authenticate with Auth0.
          </p>
        )}
      </div>
    </div>
  );
}
