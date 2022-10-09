-- migrate:up
CREATE TABLE applications(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_posts_post_id_id FOREIGN KEY (post_id) REFERENCES posts (id),
    CONSTRAINT fk_posts_user_id_id FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE KEY uk_posts (post_id, user_id)
);

-- migrate:down
DROP TABLE applications;
