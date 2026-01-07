const express = require("express");
const productModel = require("../models/product-model")
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
   let products = await productModel.find()
  res.render("shop",{products});
});

module.exports = router;
