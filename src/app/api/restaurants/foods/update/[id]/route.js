import { connectionStr } from "@/lib/db";
import { Food } from "@/lib/model/foodModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await Food.findOne({ _id: params.id });
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}

export async function PUT(req, { params }) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await Food.findOneAndUpdate({ _id: params.id }, payload);
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
