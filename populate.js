const connectDB = require("./db/connect");
const Prodcut = require("./models/product");
const jsonProducts = require("./products.json");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Prodcut.deleteMany();
    await Prodcut.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
