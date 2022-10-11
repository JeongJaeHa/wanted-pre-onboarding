const applicationDao = require("../models/applicationDao");
const existCheck = require("../utils/existCheck");

const applyPost = async (id, userId) => {
    await existCheck.checkPost(id);
    await existCheck.checkApply(id, userId);
}

module.exports = {
    applyPost
}