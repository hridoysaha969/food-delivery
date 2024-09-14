import { connectionStr } from "@/lib/db";
import { Restaurants } from "@/lib/model/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);

  const data = await Restaurants.find();

  return NextResponse.json({ result: data, success: true }, { status: 200 });
}

export async function POST(req) {
  let payload = await req.json();
  let data;
  let success = false;
  await mongoose.connect(connectionStr);

  if (payload.login) {
    // Write login api
    data = await Restaurants.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (data) {
      success = true;
    }
  } else {
    // Write Sign api
    const restaurant = new Restaurants(payload);
    data = await restaurant.save();
    if (data) {
      success = true;
    }
  }

  return NextResponse.json({ result: data, success });
}
