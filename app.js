const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash")
require("dotenv").config();

//route
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const baseRouter = require("./routes/index");

//db
const db = require("./config/mongoose-connection");

const app = express();

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.ESPRESS_SESSON_SECRET
    })
)
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");

app.use("/",baseRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);