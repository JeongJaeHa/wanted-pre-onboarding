const { AppDataSource } = require("./datasource");
const Error = require("../middlewares/errorConstructor");
const corperation = require("../entities/corperations");
const post = require("../entities/posts");

const listPost = async() => {
    try{
    return AppDataSource
        .createQueryBuilder()
        .select(["post.id AS id",
        "post.title AS title",
        "post.skill AS skill",
        "post.position AS position",
        "corperation.name AS name"])
        .from(post, "post")
        .innerJoin(corperation, "corperation", "post.corperation_id = corperation.id")
        .execute()}
    catch(err) {
        throw new Error("INVALID DATA INPUT", 500)
    }
}

const searchPost = async(keyword) => {
    try{
    return AppDataSource
        .createQueryBuilder()
        .select(
            ["post.id AS id",
            "post.title AS title",
            "post.skill AS skill",
            "post.position AS position",
            "corperation.name AS name"])
        .from(post, "post")
        .innerJoin(corperation, "corperation", "post.corperation_id = corperation.id")
        .where("corperation.name like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.title like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.position like :keyword", { keyword: `%${keyword}%` })
        .orWhere("post.skill like :keyword", { keyword: `%${keyword}%` } )
        .execute()}
    catch(err) {
        throw new Error("INVALID DATA INPUT", 500)
    }
}

const getCorperationInformation = async(id) => {
    try{
    return AppDataSource
        .createQueryBuilder()
        .select("corperation_id")
        .from(post, "post")
        .where("id = :id", { id: id })}
    catch(err) {
        throw new  Error("INVALID DATA INPUT", 500)
    }
}

const getDetail = async (id) => {
    try{
    return AppDataSource
        .createQueryBuilder()
        .select(
            ["post.id AS id",
            "post.title AS title",
            "post.skill AS skill",
            "post.position As postiion",
            "corperation.location AS location",
            "corperation.name AS name",
            "post.compensation AS compensation",
            "post.deadline AS deadline",
            "post.explanation AS explanation"
        ])
        .from(post, "post")
        .innerJoin(corperation, "corperation", "post.corperation_id = corperation.id")
        .where("post.id = :id", {id: id})
        .execute()}
    catch (err) {
        throw new Error("INVALID DATA INPUT", 500);
    }
}

const getOtherPost = async (corperation_id) => {
    try{
    return AppDataSource.query(
        `
        SELECT JSON_ARRAYAGG(p.id) AS other FROM post p WHERE corperation_id=${corperation_id}
        `
    )}
    catch(err) {
        throw new Error("INVALID DATA INPUT", 500)
    }
}

const registerPost = async (title, position, skill, compensation, explanation, deadline, corperation_id) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .insert()
            .into("post")
            .values({title, position, skill, compensation, explanation, deadline, corperation_id})   
            .execute()     
    } catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

const editPost = async (id, title, corperation_id, position, skill, compensation, explanation, deadline) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .update("post")
            .set({id, title, corperation_id, position, skill, compensation, explanation, deadline})
            .where("id=:id", {id: id})  
            .execute()     
    } catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

const getCorperationIdByName = async (name) => {
    try{
        return await AppDataSource
            .createQueryBuilder()
            .select("id")
            .from(corperation, "corperation")
            .where("name=:name", {name: name})
            .execute()}
    catch(err) {
        throw new Error("INVALID DATA INPUT", 500);
    }
}

const checkPost = async (id) => {
    try{
    return await AppDataSource.query(
        `
        SELECT EXISTS (
            SELECT * FROM post p
            WHERE p.id=${id})
        `
    )}
    catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

const deletePost = async (id) => {
    try{
        return await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(post, "post")
            .where("id=:id", {id: id})
            .execute()}
    catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
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
