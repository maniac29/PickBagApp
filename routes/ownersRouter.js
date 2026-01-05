const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(500)
        .send("Unauthorised request. Cannont create more than one admin user");
    } else {
      let { fullname, email, password } = req.body;
      let createdUser = await ownerModel.create({
        fullname: fullname,
        email: email,
        password: password,
      });
      res.status(201).send(createdUser)
    }
  });
}

router.get("/", (req, res) => {
  res.send("hey");
});

module.exports = router;
