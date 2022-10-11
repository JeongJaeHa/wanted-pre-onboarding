const postDao = require("../models/postDao");
const applicationDao = require("../models/applicationDao");
const Error = require("../middlewares/errorConstructor");

const checkPost = async function(id) {
    const checkPostExist = await postDao.checkPost(id);
    const postId = Number(Object.values(checkPostExist[0])[0]);
    if (postId === 0) {
        throw new Error("POST NOT EXISTS", 400);
    } else return true
};

const corperation = async function(name) {
    const getCorperationId = await postDao.getCorperationIdByName(name);
    if(getCorperationId.length === 0) {
        throw new Error("회사를 등록해주세요", 400)
    }
    const corperation_id = Number(Object.values(getCorperationId[0])[0]);
    return  corperation_id;
}

const checkApply = async function(id, userId) {
    try {
        await applicationDao.applyPost(id, userId);
    } catch(err) {
        throw new Error("이미 지원한 채용공고 입니다.", 400);
    }
};

const getName = async function(id) {
    const result = await applicationDao.getName(id);
    const name = Object.values(result[0])[0];
    return name;
}

module.exports = {
    checkPost,
    checkApply,
    corperation,
    getName
}