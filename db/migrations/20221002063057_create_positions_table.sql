-- migrate:up
CREATE TABLE positions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE positions;