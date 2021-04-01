const express = require("express");
const cors = require("cors");
const passport = require("passport");

const config = require("./config");
require("./db");
const buildRoutes = require("./routes/");

const app = express();
const apiPort = config.apiPort || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport")(passport);

app.use("/api", buildRoutes);

app.use("/", async (req, res, next) => {
  return res.status(200).send({
    api: [{ path: "/api/characters", method: "GET" }],
  });
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
