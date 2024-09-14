import mongoose from "mongoose";
const restaurantsModel = new mongoose.Schema({
  email: String,
  password: String,
  restaurantName: String,
  city: String,
  address: String,
  contactNo: String,
});

export const Restaurants =
  mongoose.models.restaurants ||
  mongoose.model("restaurants", restaurantsModel);
