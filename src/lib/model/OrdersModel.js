const { default: mongoose } = require("mongoose");

const orderModel = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemIds: String,
  resto_id: mongoose.Schema.Types.ObjectId,
  courier_id: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: Number,
});

export const Order =
  mongoose.models.orders || mongoose.model("orders", orderModel);
