import { auth } from "~/utils/auth";
import { createFileRoute } from "@tanstack/react-router";

/**
 * Handles all auth routes: /api/auth/*
 */

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
      GET: async ({ request }: { request: Request }) => {
        return await auth.handler(normalizeRailwayRequest(request));
      },
      POST: async ({ request }: { request: Request }) => {
        return await auth.handler(normalizeRailwayRequest(request));
      },
    },
  },
});
