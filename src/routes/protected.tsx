import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/utils/auth-client";

export const Route = createFileRoute("/protected")({
  // beforeLoad: ({ context }) => {
  //   if (!context.session) {
  //     throw redirect({ to: '/login' })
  //   }
  // },
  component: Protected,
});

function Protected() {
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold">Protected Page</h1>
      <p className="mb-8 text-gray-600">
        This page is only accessible to authenticated users.
      </p>

      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-green-800">
          Welcome, {user?.name ?? "User"}!
        </h2>

        {user && (
          <div className="space-y-2 text-green-700">
            <p>
              <strong>Email:</strong> {user?.email ?? "N/A"}
            </p>
            {error && (
              <div>
                <p>error</p>
              </div>
            )}
            {isPending && (
              <div>
                <p>Loading...</p>
              </div>
            )}
            {user?.image && (
              <div>
                <strong>Avatar:</strong>
                <img
                  src={user.image}
                  alt="User avatar"
                  className="mt-2 h-20 w-20 rounded-full"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg bg-gray-100 p-4">
        <h3 className="mb-2 font-semibold">Session Data (Debug)</h3>
        <pre className="overflow-auto rounded bg-gray-800 p-4 text-xs text-green-400">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
