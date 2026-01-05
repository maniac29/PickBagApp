const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${config.MONGODB_URI}/pickBagApp`)
.then(()=>{
    dbgr("connected");
})
.catch((err)=>{
    dbgr(err);
})


module.exports = mongoose.connection;