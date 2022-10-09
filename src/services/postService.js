const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");
const information = require("../utils/getId");

const listPost = async() => {
    const getList = await postDao.listPost();
    return getList
}

const searchPost = async(keyword) => {
    const searchList = await postDao.searchPost(keyword);
    return searchList
}

const detailPost = async(id) => {
    const corperationId = await information.getCorperationId(id);
    if (corperationId.length === 0) {
        throw new Error("NOT EXISTS POST", 400);
    }

    const getDetailPage = await postDao.getDetail(id);

    const getOtherPosts = await postDao.getOtherPost(corperationId);
    const getOtherPostsResult = JSON.parse(Object.values(getOtherPosts[0])[0]);

    return [getDetailPage, getOtherPostsResult];
}

module.exports = {
    listPost,
    searchPost,
    detailPost
}