const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "users",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "varchar",
            nullable: false
        },
        skill: {
            type: "varchar",
            nullable: false
        },
        about: {
            type: "text",
            nullable: true
        },
        created_at: {
            type: "timestamp",
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: "timestamp",
            nullable: true,
            onUpdate: 'CURRENT_TIMESTAMP'
        }
    },
});