const express = require("express");
const applicationController = require("../controllers/applicationControler");
const router = express.Router();

router.post("/", applicationController.applyPost);

module.exports = { router };
