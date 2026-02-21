/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { authClient } from "~/utils/auth-client";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  // createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import appCss from "~/styles/app.css?url";
import type { Session } from "better-auth";
// import { createServerFn } from "@tanstack/react-start";
// import { getRequest } from "@tanstack/react-start/server";
// import { auth } from "~/utils/auth";

interface RouterContext {
  session: Session | null;
}

// const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
//   const request = getRequest();
//   const session = await auth.api.getSession({ headers: request.headers });
//   return session;
// });

export const Route = createRootRoute<RouterContext>({
  // beforeLoad: async () => {
  //   const session = await fetchSession();
  //   return {
  //     session,
  //   };
  // },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Auth Example",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <NavBar />
        <main className="p-4">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function NavBar() {
  // const routeContext = Route.useRouteContext();
  const { data: session, error } = authClient.useSession();
  const navigate = useNavigate();
  async function signOut(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({
              to: "/login",
            });
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav className="flex items-center gap-4 bg-gray-100 p-4">
      <Link
        to="/"
        activeProps={{ className: "font-bold" }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link to="/protected" activeProps={{ className: "font-bold" }}>
        Protected
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {error && <p>error</p>}
        {session ? (
          <>
            <span className="text-gray-600">
              {session?.user?.name || session?.user?.email}
            </span>
            <button
              onClick={(e) => signOut(e)}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
