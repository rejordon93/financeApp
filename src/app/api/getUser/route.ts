import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const { email } = verifyToken(token); // May throw if token is invalid

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user with that email" },
        { status: 404 }
      );
    }

    // Return only safe fields
    return NextResponse.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in /api/getUser:", error);
    return NextResponse.json(
      { error: "Invalid token or internal error" },
      { status: 500 }
    );
  }
}
