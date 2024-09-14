import { connectionStr } from "@/lib/db";
import { Food } from "@/lib/model/foodModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const food = new Food(payload);
  const result = await food.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
