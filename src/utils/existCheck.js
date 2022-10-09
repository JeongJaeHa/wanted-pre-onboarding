const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");

const checkPost = async function(id) {
    const checkPostExist = await postDao.checkPost(id);
    const checkResult = Number(Object.values(checkPostExist[0])[0]);
    if (checkResult === 0) {
        throw new Error("POST NOT EXISTS", 400);
    } else return checkResult;
};

const checkApply = async function(id, userId) {
    const checkApply = await postDao.checkApply(id, userId);
    const checkResult = await Number(Object.values(checkApply[0])[0]);
    if(checkResult !== 1) {
        await postDao.applyPost(id, userId);
        return true;
    } else {
        await postDao.applyDelete(id, userId);
        return false;
    }
};

module.exports = {
    checkPost,
    checkApply
}