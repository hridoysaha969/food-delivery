const { default: mongoose } = require("mongoose");

const foodModal = new mongoose.Schema({
  title: String,
  price: Number,
  path: String,
  description: String,
  resto_id: mongoose.Schema.Types.ObjectId,
});

export const Food = mongoose.models.foods || mongoose.model("foods", foodModal);
