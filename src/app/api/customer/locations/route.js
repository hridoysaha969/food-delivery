import { connectionStr } from "@/lib/db";
import { Restaurants } from "@/lib/model/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  let result = await Restaurants.find();
  result = result.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1)
  );

  result = [...new Set(result.map((item) => item))];

  return NextResponse.json({ result, success: true });
}
