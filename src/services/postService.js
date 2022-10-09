const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");

const listPost = async() => {
    const getList = await postDao.listPost();
    return getList
}

const searchPost = async(keyword) => {
    const searchList = await postDao.searchPost(keyword);
    return searchList
}

module.exports = {
    listPost,
    searchPost
}