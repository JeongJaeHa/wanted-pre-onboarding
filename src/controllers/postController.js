const postService = require("../services/postService");
const Error = require("../middlewares/errorConstructor");


const listPost = async (req, res) => {
    const getListPost = await postService.listPost();
    res.status(200).json({"list": getListPost});
}

const searchPost = async (req, res) => {
    const { keyword } = req.query
    if ( keyword === '') {
        throw new Error("검색어를 입력해주세요", 400);
    }
    const getSearchPost = await postService.searchPost(keyword);
    if(getSearchPost.length === 0) {
        res.status(204).json({"message": "검색결과가 없습니다."});
    } else res.status(200).json({"result": getSearchPost});
}

module.exports = {
    listPost,
    searchPost
}