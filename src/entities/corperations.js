const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "corperations",
    tableName: "corperation",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        location: {
            type: "varchar"
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