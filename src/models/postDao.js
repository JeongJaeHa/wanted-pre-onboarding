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

module.exports = {
    listPost,
    searchPost
}
