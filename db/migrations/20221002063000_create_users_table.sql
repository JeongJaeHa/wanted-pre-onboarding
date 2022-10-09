-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    skill VARCHAR(200) NOT NULL,
    carrer INT,
    about TEXT,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;
