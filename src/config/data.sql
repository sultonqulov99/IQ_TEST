CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- "subject" tablosu
CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    status_id INT,
    FOREIGN KEY (status_id) REFERENCES status(id)
);

-- "user" tablosu
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    status_id INT,
    password VARCHAR(255),
    email_code VARCHAR(255),
    FOREIGN KEY (status_id) REFERENCES status(id)
);
CREATE TABLE key_ball(
	user_id INT,
	key INT,
    ball INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)
-- "question" tablosu
CREATE TABLE question_test (
    id SERIAL PRIMARY KEY,
    level VARCHAR(10),
    test_text VARCHAR(255),
    subject_id INT,
    correct_answer VARCHAR(255),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);
CREATE TABLE question_img (
    id SERIAL PRIMARY KEY,
    img VARCHAR(256),
    question_text VARCHAR(255),
    question_test_id INT,
    correct_answer VARCHAR(255),
    FOREIGN KEY (question_test_id) REFERENCES question_test(id)
);

-- "answer" tablosu
CREATE TABLE answer_test (
    id SERIAL PRIMARY KEY,
    question_test_id INT,
    chosen_answer VARCHAR(50),
    FOREIGN KEY (question_tets_id) REFERENCES question_test(id)
);
CREATE TABLE answer_img (
    id SERIAL PRIMARY KEY,
    question_img_id INT,
    chosen_answer VARCHAR(255),
    FOREIGN KEY (question_img_id) REFERENCES question_img(id)
);