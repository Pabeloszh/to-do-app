const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require('cors');

const app = express();
const todoController = require("./controllers/todoControllers");

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: ['http://localhost:4200'],
"methods": "GET,PUT,POST",
"preflightContinue": false,
"optionsSuccessStatus": 204,
credentials: true,}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.use("/todo", todoController);
