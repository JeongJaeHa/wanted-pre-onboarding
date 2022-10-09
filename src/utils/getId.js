const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");

const getCorperationId = async function(id) {
    const getCorpId = await postDao.getCorperationId(id);
    if ( getCorpId.length === 0) {
        throw new Error("POST NOT EXISTS", 400);
    } else {
    const getCorpIdResult = JSON.stringify(Object.values(getCorpId[0])[0]);
    const corpId = getCorpIdResult.replace (/\"/gi,'');
    return corpId;
    }
};

module.exports = {
    getCorperationId
}