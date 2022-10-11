const { AppDataSource } = require("./datasource");
const post = require("../entities/posts");

const applyPost = async (id, userId) => {
    return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into("applications")
        .values({post_id: id, user_id: userId})
        .execute()
}

const checkApply = async (id, userId) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS (SELECT * FROM applications WHERE user_id=${userId} AND post_id=${id})
        `
    )
}

const getName = async (id) => {
    return await AppDataSource
        .createQueryBuilder()
        .select("name")
        .from(post, "post")
        .where("post.id=:id", {id: id})
        .execute()
}

module.exports = {
    applyPost,
    checkApply,
    getName
}
