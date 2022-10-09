const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");

const getCorperationId = async function(id) {
    const getCorpId = await postDao.getCorperationId(id);
    if ( getCorpId.length === 0) {
        throw new Error("INVALID DATA INPUT", 400);
    } else {
    const getCorpIdResult = JSON.stringify(Object.values(getCorpId[0])[0]);
    const corpId = getCorpIdResult.replace (/\"/gi,'');
    return corpId;
    }
};

const getInformationIdByName = async function(name) {
    const getCorperationIdByName = await postDao.getCorperationIdByName(name);
    if ( getCorperationIdByName.length === 0) {
        throw new Error("INCORRECT NAME", 400);
    } else {
    const getCorperationIdResult = JSON.stringify(Object.values(getCorperationIdByName[0])[0]);
    const corpId = getCorperationIdResult.replace (/\"/gi,'');
    return corpId;
    }
};

const getPositionId = async function(position) {
    const getPositionId = await postDao.getPositionId(position);
    if ( getPositionId.length === 0) {
        throw new Error("INCORRECT POSITION", 400);
    } else {
    const getPositionIdResult = JSON.stringify(Object.values(getPositionId[0])[0]);
    const positionId = getPositionIdResult.replace (/\"/gi,'');
    return positionId;
    }
};

const getSkillId = async function(skill) {
    const getSkillId = await postDao.getSkillId(skill);
    if ( getSkillId.length === 0) {
        throw new Error("INCORRECT SKILL", 400);
    } else {
    const getSkillIdResult = JSON.stringify(Object.values(getSkillId[0])[0]);
    const skillId = getSkillIdResult.replace (/\"/gi,'');
    return skillId;
    }
};

module.exports = {
    getCorperationId,
    getInformationIdByName,
    getPositionId,
    getSkillId
}