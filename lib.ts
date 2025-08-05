import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma'
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(values: { email: string; password: string }) {
  // Verify credentials && get the user
  const email = values.email.trim();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    console.error("No user found or password missing for email:", values.email);
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(values.password, user.password);
  if (!isPasswordValid) {
    console.error("Invalid password for email:", values.email);
    throw new Error('Invalid email or password');
  }

  // Create the session with minimal user info
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const sessionUser = { id: user.id, email: user.email, name: user.username };
  const session = await encrypt({ user: sessionUser, expires });
  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
export async function getLatestReviews(limit = 10) {
  return await prisma.review.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      chip: true,
      rating: true,
    },
  });
}

export async function getStats() {
  const [
    totalReviews,
    totalChips,
    totalUsers,
    totalRatings,
  ] = await Promise.all([
    prisma.review.count(),
    prisma.chip.count(),
    prisma.user.count(),
    prisma.rating.count(),
  ]);

  return {
    totalReviews,
    totalChips,
    totalUsers,
    totalRatings,
  };
}


