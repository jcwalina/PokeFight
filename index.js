const express = require('express')
const app = express()
const PORT = 3002;
require("dotenv").config();
const pokemonRouter = require("./routes/pokemonRouter");


app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const cors = require("cors"); 
app.use(cors());




app.use("/api/pokemon", pokemonRouter);


app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
