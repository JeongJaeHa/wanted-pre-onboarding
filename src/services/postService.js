const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");
const existCheck = require("../utils/existCheck");

const listPost = async() => {
    const getList = await postDao.listPost();
    return getList
}

const searchPost = async(keyword) => {
    const searchList = await postDao.searchPost(keyword);
    return searchList
}

const detailPost = async(id) => {
    await existCheck.checkPost(id);
    const name = await existCheck.getName(id);
    const corperation_id = await existCheck.corperation(name);

    const getDetailPage = await postDao.getDetail(id);
    const getOtherPosts = await postDao.getOtherPost(corperation_id);
    const getOtherPostsResult = JSON.parse(Object.values(getOtherPosts[0])[0]);

    return [getDetailPage, getOtherPostsResult];
}

const registerPost = async (title, name, position, skill, compensation, explanation, deadline) => {
    const corperation_id = await existCheck.corperation(name);

    await postDao.registerPost(title, name, position, skill, compensation, explanation, deadline, corperation_id);
    return true;
}

const editPost = async (id, title, name, position, skill, compensation, explanation, deadline) => {
    await existCheck.checkPost(id);
    await existCheck.corperation(name);

    await postDao.editPost(id, title, name, position, skill, compensation, explanation, deadline);
    return true;
}

const deletePost = async (id) => {
    const result = await existCheck.checkPost(id);
    if (result) await postDao.deletePost(id);
    return true;
}

const applyPost = async (id, userId) => {
    await existCheck.checkPost(id);
    await existCheck.checkApply(id, userId);
}

module.exports = {
    listPost,
    searchPost,
    detailPost,
    registerPost,
    editPost,
    deletePost,
    applyPost
}