const applicationService = require("../services/applicationService");

const applyPost = async (req, res) => {
    const { id, userId } = req.body
    await applicationService.applyPost(id, userId);
    return res.status(200).json({"message":"지원하셨습니다.", "post_id": id, "user_id": userId });
}

module.exports = {
    applyPost
}