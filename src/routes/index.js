const express = require("express");
const router = express.Router();
const postRouter = require("./postRouter");
const applicationRouter = require("./applicationRouter");

router.use("/post", postRouter.router);

router.use("/application", applicationRouter.router);

module.exports = router;