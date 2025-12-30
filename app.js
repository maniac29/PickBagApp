const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

//route
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");

//db
const db = require("./config/mongoose-connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);