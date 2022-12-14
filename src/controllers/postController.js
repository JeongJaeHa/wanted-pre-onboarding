const postService = require("../services/postService");
const Error = require("../middlewares/errorConstructor");


const listPost = async (req, res) => {
    const getListPost = await postService.listPost();
    res.status(200).json({"list": getListPost});
}

const searchPost = async (req, res) => {
    const { keyword } = req.query
    if ( keyword === '') throw new Error("검색어를 입력해주세요", 400);
    
    const getSearchPost = await postService.searchPost(keyword);
    if(getSearchPost.length === 0) {
        res.status(204).json({"message": "검색결과가 없습니다."});
    } else res.status(200).json({"result": getSearchPost});
}

const detailPost = async (req, res) => {
    const { id } = req.query
    const getDetailPost = await postService.detailPost(id);
    res.status(200).json({"detailPost": getDetailPost});
}

const registerPost = async (req, res) => {
    const { title, name, position, skill, compensation, explanation, deadline } = req.body
    if( !title || !name || !skill || !compensation || !explanation || !deadline ) {
        return res.status(400).json({"message":"빈칸 없이 모두 입력해주세요"})
    } else await postService.registerPost(title, name, position, skill, compensation, explanation, deadline);
    return res.status(200).json({"message": "채용공고 등록에 성공하였습니다!"});
};

const editPost= async (req, res) => {
    const { id, title, name, position, skill, compensation, explanation, deadline } = req.body
    if( !id || !title || !name || !skill || !compensation || !explanation || !deadline ) {
        return res.status(400).json({"message":"빈칸 없이 모두 입력해주세요"})
    } else await postService.editPost(id, title, name, position, skill, compensation, explanation, deadline);
    return res.status(200).json({"message": "edit success"});
}

const deletePost= async (req, res) => {
    const { id } = req.query
    const result = await postService.deletePost(id);
    if (result === true){
        return res.status(204).json({});
    }
}

module.exports = {
    listPost,
    searchPost,
    detailPost,
    registerPost,
    editPost,
    deletePost
}