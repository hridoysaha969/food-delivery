import { connectionStr } from "@/lib/db";
import { Food } from "@/lib/model/foodModal";
import { Restaurants } from "@/lib/model/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await mongoose.connect(connectionStr);
  const details = await Restaurants.findOne({ _id: params.id });
  const foods = await Food.find({ resto_id: params.id });

  return NextResponse.json({ details, foods, success: true });
}
