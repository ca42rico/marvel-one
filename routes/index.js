const express = require("express");
const passport = require("passport");

const characters = require("../controllers/characters.controller");

const router = express.Router();

router.use(
  "/characters",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/",
  }),
  characters
);

module.exports = router;
