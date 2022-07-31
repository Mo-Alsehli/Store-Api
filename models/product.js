const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  price: {
    type: String,
    required: [true, "Price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Products", productSchema);
