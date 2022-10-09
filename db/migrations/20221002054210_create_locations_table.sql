-- migrate:up
CREATE TABLE locations(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE locations;
