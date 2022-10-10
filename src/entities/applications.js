const EntitySchema = require("typeorm").EntitySchema; 

module.exports = new EntitySchema({
    name: "applications",
    tableName: "applications",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        post_id: {
            type: "int"
        },
        user_id: {
            type: "int"
        }
    },
    relations: {
        application: {
        type: 'many-to-one',
        target: 'post',
        joinColumn: {
            name: 'post_id',
            },
        },
        users: {
            type: 'many-to-one',
            target: 'user',
            joinColumn: {
            name: 'user_id',
            },
        }
    },
    uniques: [
        {
            name: "application_UNIQUE_KEY",
            columns: ["user_id", "post_id"],
        },
    ],
});