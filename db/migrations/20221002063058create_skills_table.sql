-- migrate:up
CREATE TABLE skills(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    skill VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE skills;
