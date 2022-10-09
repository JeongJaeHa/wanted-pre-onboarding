const express = require("express");
const postController = require("../controllers/postController");
const errorHandler = require("../middlewares/errorHandler")
const router = express.Router();

router.get("/list", errorHandler(postController.listPost)); // 리스트

router.get("/list/search", errorHandler(postController.searchPost)); // 리스트 검색

module.exports = { router };
