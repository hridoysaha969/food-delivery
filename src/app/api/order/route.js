import { connectionStr } from "@/lib/db";
import { Order } from "@/lib/model/OrdersModel";
import { Restaurants } from "@/lib/model/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const order = new Order(payload);
  const result = await order.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("id");
  let success = false;
  await mongoose.connect(connectionStr);
  let result = await Order.find({ user_id: userId });

  if (result) {
    success = true;
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurants.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        restoInfo.orderId = item._id;
        return restoInfo;
      })
    );
    result = restoData;
  }

  return NextResponse.json({ result, success });
}
