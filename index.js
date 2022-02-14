const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
require("dotenv").config();
const pokemonRouter = require("./routes/pokemonRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const player = require("./API/player")  
const mongoose = require("mongoose");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const cors = require("cors");
app.use(cors());
mongoose.connect(process.env.MONGO_DB);

app.use("/api/pokemon", pokemonRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/player", player)




app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
