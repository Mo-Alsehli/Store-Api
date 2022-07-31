const express = require("express");
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const dotenv = require("dotenv");
const conntectDB = require("./db/connect.js");
const productsRouter = require("./routes/products");
require("express-async-errors");

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/products">Go Products</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    const connectionString = process.env.MONGO_URI;
    await conntectDB(connectionString);
    app.listen(port, console.log(`Server Started At Port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
