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

module.exports = {
    listPost,
    searchPost,
    getCorperationInformation,
    getDetail,
    getOtherPost,
    getCorperationId
}
