import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const { email } = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user with that email" },
        { status: 404 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Return only safe fields
    return NextResponse.json({
      firstname: profile.firstname,
      lastname: profile.lastname,
      city: profile.city,
      region: profile.region,
      income: profile.income,
      taxRate: profile.taxRate,
      debt: profile.debt,
      bio: profile.bio,
      goals: profile.goals,
    });
  } catch (error) {
    console.error("Error in /api/getUser:", error);
    return NextResponse.json(
      { error: "Invalid token or internal error" },
      { status: 500 }
    );
  }
}
