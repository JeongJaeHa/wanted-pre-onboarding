const { AppDataSource } = require("./datasource");
const Error = require("../middlewares/errorConstructor");
const corperation = require("../entities/corperations");
const post = require("../entities/posts");

const listPost = async() => {
    return AppDataSource
        .createQueryBuilder()
        .select(["post.id AS id",
        "post.title AS title",
        "post.skill AS skill",
        "post.position AS position",
        "post.name AS name"])
        .from(post, "post")
        .execute()
}

const searchPost = async(keyword) => {
    return AppDataSource
        .createQueryBuilder()
        .select(
            ["post.id AS id",
            "post.title AS title",
            "post.skill AS skill",
            "post.position AS position",
            "post.name AS name"])
        .from(post, "post")
        .where("post.name like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.title like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.position like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.skill like :keyword", { keyword: `%${keyword}%` } )
        .execute()
}

const getCorperationInformation = async(id) => {
    return AppDataSource
        .createQueryBuilder()
        .select("corperation_id")
        .from(post, "post")
        .where("id = :id", { id: id })
}

const getDetail = async (id) => {
    return AppDataSource
        .createQueryBuilder()
        .select(
            ["post.id AS id",
            "post.title AS title",
            "post.skill AS skill",
            "post.position As postiion",
            "post.name AS name",
            "corperation.location AS location",
            "post.compensation AS compensation",
            "post.deadline AS deadline",
            "post.explanation AS explanation"
        ])
        .from(post, "post")
        .innerJoin(corperation, "corperation", "post.corperation_id = corperation.id")
        .where("post.id = :id", {id: id})
        .execute()
}

const getOtherPost = async (corperation_id) => {
    return AppDataSource.query(
        `
        SELECT JSON_ARRAYAGG(p.id) AS other FROM post p WHERE corperation_id=${corperation_id}
        `
    )
}

const registerPost = async (title, name, position, skill, compensation, explanation, deadline, corperation_id) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .insert()
            .into("post")
            .values({title, name, position, skill, compensation, explanation, deadline, corperation_id})   
            .execute()     
    } catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

const editPost = async (id, title, name, position, skill, compensation, explanation, deadline) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .update("post")
            .set({id, title, name, position, skill, compensation, explanation, deadline})
            .where("id=:id", {id: id})  
            .execute()     
    } catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

const getCorperationIdByName = async (name) => {
        return await AppDataSource
            .createQueryBuilder()
            .select("id")
            .from(corperation, "corperation")
            .where("name=:name", {name: name})
            .execute();
}

const checkPost = async (id) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS (
            SELECT * FROM post p
            WHERE p.id=${id})
        `
    )
}

const deletePost = async (id) => {
    return await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(post, "post")
        .where("id=:id", {id: id})
        .execute()
}

module.exports = {
    listPost,
    searchPost,
    getCorperationInformation,
    getDetail,
    getOtherPost,
    registerPost,
    editPost,
    getCorperationIdByName,
    checkPost,
    deletePost
}
