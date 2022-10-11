const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/list", postController.listPost);

router.get("/list/search", postController.searchPost);

router.get("/detail", postController.detailPost);

router.post("/register", postController.registerPost);

router.put("/", postController.editPost);

router.delete("/", postController.deletePost); 

module.exports = { router };
