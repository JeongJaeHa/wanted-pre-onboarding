const { AppDataSource } = require("./datasource");

const listPost = async() => {
    return AppDataSource.query(
        `
        SELECT 
        p.title,
        c.name,
        l.location,
        pp.position,
        ps.skill
        FROM posts p
        LEFT JOIN skills ps ON p.skill_id = ps.id
        LEFT JOIN positions pp ON p.position_id = pp.id
        LEFT JOIN corps c ON p.corp_id = c.id
        LEFT JOIN locations l ON c.location_id = l.id
        `
    )
}

const searchPost = async(keyword) => {
    return AppDataSource.query(
        `
        SELECT 
        p.title,
        c.name,
        l.location,
        pp.position,
        ps.skill
        FROM posts p
        LEFT JOIN skills ps ON p.skill_id = ps.id
        LEFT JOIN positions pp ON p.position_id = pp.id
        LEFT JOIN corps c ON p.corp_id = c.id
        LEFT JOIN locations l ON c.location_id = l.id
        WHERE CONCAT(p.title, c.name, l.location, pp.position, ps.skill) REGEXP '${keyword}'
        `
    )
}


const getCorperationInformation = async(id) => {
    return AppDataSource.query(
        `
        SELECT corp_id FROM posts WHERE id=${id}
        `
    )
}

const getDetail = async (id) => {
    return AppDataSource.query(
        `
        SELECT 
        p.title,
        c.name,
        l.location,
        pp.position,
        ps.skill,
        p.compensation,
        p.explanation,
        p.deadline
        FROM posts p
        LEFT JOIN skills ps ON p.skill_id = ps.id
        LEFT JOIN positions pp ON p.position_id = pp.id
        LEFT JOIN corps c ON p.corp_id = c.id
        LEFT JOIN locations l ON c.location_id = l.id
        WHERE p.id=${id}
        `
    )
}

const getOtherPost = async (corp_id) => {
    return AppDataSource.query(
        `
        SELECT(SELECT
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "otherPostsId", p.id
                )
            ) JSON ) as other_posts
            FROM posts p
            WHERE corp_id=${corp_id}
        `
    )
}

const getCorperationId = async(id) => {
    return AppDataSource.query(
        `
        SELECT corp_id FROM posts WHERE id=${id}
        `
    )
}

const getCorperationIdByName = async (name) => {
    return await AppDataSource.query(
        `
        SELECT id FROM corps
        WHERE name='${name}'
        `
    )
}

const getPositionId = async (position) => {
    return await AppDataSource.query(
        `
        SELECT id FROM positions
        WHERE position='${position}'
        `
    )
}

const getSkillId = async (skill) => {
    return await AppDataSource.query(
        `
        SELECT id FROM skills
        WHERE skill='${skill}'
        `
    )
}

const registerPost = async (title, corperationId, positionId, skillId, compensation, explanation, deadline) => {
    return await AppDataSource.query(
        `
        INSERT INTO posts
        (title, corp_id, position_id, skill_id, compensation, explanation, deadline)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [title, corperationId, positionId, skillId, compensation, explanation, deadline]
    )
}

const editPost = async (id, title, getCorpId, getPositionId, getSkillId, compensation, explanation, deadline) => {
    return await AppDataSource.query(
        `
        UPDATE posts
        SET 
        title = "${title}",
        corp_id = ${getCorpId},
        position_id = ${getPositionId},
        skill_id = ${getSkillId},
        compensation = ${compensation},
        explanation = "${explanation}",
        deadline = "${deadline}"
        WHERE id=${id}
        `
    )
}

const checkPost = async (id) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS (
            SELECT * FROM posts p
            WHERE p.id=${id})
        `
    )
}

const deletePost = async (id) => {
    return await AppDataSource.query(
        `
        DELETE FROM posts WHERE id=${id}
        `
    )
}

const applyPost = async (id, userId) => {
    return await AppDataSource.query(
        `
        INSERT INTO applications (post_id, user_id)
        VALUES (${id}, ${userId})
        `
    )
}

const checkApply = async (id, userId) => {
    return await AppDataSource.query(
        `
        SELECT EXISTS (SELECT * FROM applications WHERE user_id=${userId} AND post_id=${id})
        `
    )
}

const applyDelete = async (id, userId) => {
    return await AppDataSource.query(
        `
        DELETE FROM applications WHERE post_id=${id} AND user_id=${userId}
        `
    )
}

module.exports = {
    listPost,
    searchPost,
    getCorperationInformation,
    getDetail,
    getOtherPost,
    getCorperationId,
    getCorperationIdByName,
    getCorperationId,
    getPositionId,
    getSkillId,
    registerPost,
    editPost,
    checkPost,
    deletePost,
    applyPost,
    checkApply,
    applyDelete
}
