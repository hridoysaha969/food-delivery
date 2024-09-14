import { connectionStr } from "@/lib/db";
import { Users } from "@/lib/model/UserModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();

  let success = false;
  await mongoose.connect(connectionStr);

  // Checking if the email is exists or not
  const existingUser = await Users.findOne({ email: payload.email });
  if (existingUser) {
    return NextResponse.json(
      { result: "User already exists", success: false },
      { status: 422 }
    );
  }

  const user = new Users(payload);
  let result = await user.save();
  if (result) {
    success = true;
    console.log(result);
  }

  return NextResponse.json({ result, success });
}
