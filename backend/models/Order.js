const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  orderType: String,
  address: String,

  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  total: Number,

  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Order", orderSchema);