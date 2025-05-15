import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { verifyToken } from "@/helpers/getToken";
import { ProfileType } from "@/app/types/page";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json(); // Await the parsing of the request body
    const {
      firstname,
      lastname,
      city,
      region,
      income,
      taxRate,
      bio,
      debt,
      goals,
    }: ProfileType = reqBody;

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

    // Check if the user already has a profile
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists for this user" },
        { status: 400 }
      );
    }

    // Create the new profile
    await prisma.profile.create({
      data: {
        firstname,
        lastname,
        city,
        region,
        income,
        taxRate,
        debt,
        goals,
        bio,
        user: {
          connect: { id: user.id },
        },
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "Profile created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
