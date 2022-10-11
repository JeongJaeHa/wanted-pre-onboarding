const EntitySchema = require("typeorm").EntitySchema; 

module.exports = new EntitySchema({
    name: "posts",
    tableName: "post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar",
            nullable: false
        },
        name: {
            type: "varchar",
            nullable: false
        },
        corperation_id: {
            type: "int",
            nullable: false
        },
        position: {
            type: "varchar",
            nullable: false
        },
        skill: {
            type: "varchar",
            nullable: false
        },
        compensation: {
            type: "decimal",
            precision:10,
            scale:2,
        },
        explanation: {
            type: "text",
            nullable: true
        },
        deadline: {
            type: "varchar",
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
    relations: {
        corperations: {
        type: 'many-to-one',
        target: 'corperation',
        joinColumn: {
            name: 'corperation_id',
        },
        cascade: true, 
        }
    },
});