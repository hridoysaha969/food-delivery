import { connectionStr } from "@/lib/db";
import { Users } from "@/lib/model/UserModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  // const user = await Users.findOne({ email: payload.email });
  // if (!user) {
  //   return NextResponse.json({ result: "Invalid email", success: false }, { status: 401 });
  // }

  const result = await Users.findOne({
    email: payload.email,
    password: payload.password,
  });
  if (result) {
    success = true;
  } else {
    return NextResponse.json(
      { result: "Invalid email", success: false },
      { status: 401 }
    );
  }

  return NextResponse.json({ result, success });
}
