import { createFileRoute } from "@tanstack/react-router";
import { StartAuthJS } from "start-authjs";
import { authConfig } from "~/utils/auth";

/**
 * Auth.js API route handler
 * Handles all auth routes: /api/auth/*
 */
const { GET, POST } = StartAuthJS(authConfig);
console.log("AUTH_URL", process.env.AUTH_URL);
console.log("AUTH_TRUST_HOST", process.env.AUTH_TRUST_HOST);

function normalizeRailwayRequest(request: Request) {
  const xfProto = request.headers.get("x-forwarded-proto");
  const xfHost = request.headers.get("x-forwarded-host");

  const proto = xfProto?.split(",").pop()?.trim();
  const host = xfHost?.split(",").pop()?.trim();

  const allowedHosts = new Set([
    "start-basic-authjs-production.up.railway.app",
  ]);

  if (proto !== "https") return request;
  if (!host || !allowedHosts.has(host)) return request;

  const url = new URL(request.url);
  url.protocol = "https:";
  url.host = host;

  return new Request(url, request);
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) =>
        GET({
          request: normalizeRailwayRequest(request),
          response: new Response(),
        }),
      POST: ({ request }) =>
        POST({
          request: normalizeRailwayRequest(request),
          response: new Response(),
        }),
    },
  },
});
