import { NextRequest, NextResponse } from "next/server";
import envVariables from "../envConfig";
import { decodeJwt } from "jose";
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname == "/" ||
    pathname == "/login" ||
    pathname == "/register"
  ) {
    return NextResponse.next();
  }

  console.log("pathname", pathname);

  const acTk = req.cookies.get("acTk")?.value;
  if (acTk) {
    try {
      const decoded = decodeJwt(acTk);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp > currentTime + 5) {
        return NextResponse.next();
      }
    } catch (e) {
      console.log("Token invalid format, forcing refresh pipeline.");
    }
  }

  const incomingCookies = req.headers.get("cookie") || "";
  const refreshRes = await fetch(`${envVariables.BACKEND_HOST}/api/refresh`, {
    method: "GET",
    headers: {
      Cookie: incomingCookies,
    },
    cache: "no-store",
  });
  if (!refreshRes.ok) {
    if (pathname === "/login") return NextResponse.next();
    const loginUrl = new URL("/login", req.url);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete("jwt");
    redirectResponse.cookies.delete("acTk");
    return redirectResponse;
  }
  const response = NextResponse.next();
  const backendCookies = refreshRes.headers.getSetCookie();
  console.log("access Token reGenerated");
  if (backendCookies && backendCookies.length > 0) {
    backendCookies.forEach((cookieStr) => {
      response.headers.append("Set-Cookie", cookieStr);
    });
  }

  return response;
}
