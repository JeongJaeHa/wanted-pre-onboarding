const { AppDataSource } = require("./datasource");
const post = require("../entities/posts");
const corperation = require("../entities/corperations");

const applyPost = async (id, userId) => {
    try{
        return await AppDataSource
            .createQueryBuilder()
            .insert()
            .into("applications")
            .values({post_id: id, user_id: userId})
            .execute()}
    catch (err) {
        throw new Error("INVALID DATA INPUT", 500);
    }
}

const checkApply = async (id, userId) => {
    try{
    return await AppDataSource.query(
        `
        SELECT EXISTS (SELECT * FROM applications WHERE user_id=${userId} AND post_id=${id})
        `
    )}
    catch(err) {
        throw new Error("INVALID DATA INPUT", 500);
    }
}

const getName = async (id) => {
    try{
    return await AppDataSource
        .createQueryBuilder()
        .select("name")
        .from(post, "post")
        .innerJoin(corperation, "corperation", "post.corperation_id = corperation.id")
        .where("post.id=:id", {id: id})
        .execute()}
    catch(err) {
        throw new  Error("INVALID DATA INPUT", 500);
    }
}

module.exports = {
    applyPost,
    checkApply,
    getName
}
