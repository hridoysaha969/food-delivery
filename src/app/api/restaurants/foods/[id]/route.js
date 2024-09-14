import { connectionStr } from "@/lib/db";
import { Food } from "@/lib/model/foodModal";
import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  let success = true;
  await mongoose.connect(connectionStr);
  const result = await Food.find({ resto_id: id });

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}

export async function DELETE(req, { params }) {
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await Food.deleteOne({ _id: params.id });
  if (result.deletedCount > 0) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
