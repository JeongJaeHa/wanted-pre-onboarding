const existCheck = require("../utils/existCheck");

const applyPost = async (id, userId) => {
    await existCheck.checkPost(id);
    await existCheck.checkApply(id, userId);
    return true;
}

module.exports = {
    applyPost
}