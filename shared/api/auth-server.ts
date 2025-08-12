import invariant from "tiny-invariant";

import type { User } from "./models";
import { createCookieSessionStorage, redirect } from "@remix-run/node/dist";

invariant(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set for auth to work",
);

const sessionStorage = createCookieSessionStorage<{
  user: User;
}>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  user,
  redirectTo,
}: {
  request: Request;
  user: User;
  redirectTo: string;
}) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  return session.get("user") ?? null;
}

export async function require(request: Request) {
  const user = await getUserFromSession(request);

  if (user === null) {
    throw redirect("/login");
  }

  return user;
}
