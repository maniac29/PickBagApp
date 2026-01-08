const express = require("express");
const productModel = require("../models/product-model");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error,loggedin:false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
   let products = await productModel.find();
   let success = req.flash("success")
  res.render("shop",{products,success});
});

router.get("/addtocart/:id", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
});

router.get("/cart", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    const bill = user.cart.map((data)=> Number(data.price) + 20 - Number(data.discount))
  res.render("cart",{user,bill});
});

module.exports = router;
