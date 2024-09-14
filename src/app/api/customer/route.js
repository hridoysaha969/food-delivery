import { connectionStr } from "@/lib/db";
import { Restaurants } from "@/lib/model/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const query = req.nextUrl.searchParams;

  let filter = {};
  if (query.get("location")) {
    let city = query.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (query.get("restaurant")) {
    let restaurantName = query.get("restaurant");
    filter = { restaurantName: { $regex: new RegExp(restaurantName, "i") } };
  }
  await mongoose.connect(connectionStr);
  let result = await Restaurants.find(filter);

  return NextResponse.json({ result, success: true });
}
