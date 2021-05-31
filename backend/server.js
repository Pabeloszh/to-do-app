const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();
const todoController = require("./controllers/todoControllers");

connectDB();

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'))
}

app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);


app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.use("/todo", todoController);
