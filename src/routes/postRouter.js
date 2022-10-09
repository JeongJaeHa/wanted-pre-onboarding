const express = require("express");
const postController = require("../controllers/postController");
const errorHandler = require("../middlewares/errorHandler")
const router = express.Router();

router.get("/list", errorHandler(postController.listPost)); // 리스트

router.get("/list/search", errorHandler(postController.searchPost)); // 리스트 검색

router.get("/detail", errorHandler(postController.detailPost)); // 상세정보

router.post("/register", errorHandler(postController.registerPost)); //채용공고 등록

router.put("/", errorHandler(postController.editPost)); //채용공고 수정

router.delete("/", errorHandler(postController.deletePost)); // 채용공고 삭제

module.exports = { router };
