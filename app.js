require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>store API</h1><a href="/api/v1/products">products route</a>');
});
app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("listening"));
  } catch (error) {
    console.log(error);
  }
};
start();
