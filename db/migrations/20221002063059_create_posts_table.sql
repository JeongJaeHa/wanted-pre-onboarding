-- migrate:up
CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    corperation_id INT NOT NULL,
    position_id INT NOT NULL,
    skill_id INT NOT NULL,
    compensation DECIMAL(7, 0) NOT NULL,
    explanation TEXT NULL,
    deadline VARCHAR(200) NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_corperation_id FOREIGN KEY (corperation_id) REFERENCES corperations (id),
    CONSTRAINT fk_posts_skill_id FOREIGN KEY (skill_id) REFERENCES skills(id),
    CONSTRAINT fk_posts_position_id FOREIGN KEY (position_id) REFERENCES positions(id)
);

-- migrate:down
DROP TABLE posts;
