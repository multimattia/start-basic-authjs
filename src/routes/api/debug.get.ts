// src/routes/api/debug.get.ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/debug/get")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return Response.json({
          requestUrl: request.url,
          host: request.headers.get("host"),
          xfHost: request.headers.get("x-forwarded-host"),
          xfProto: request.headers.get("x-forwarded-proto"),
        });
      },
    },
  },
});
