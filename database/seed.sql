INSERT INTO users
(name, email, age, password)
VALUES
('Demo User', 'demo@example.com', 12, 'demo123');

INSERT INTO predictions
(user_id, file_type, filename, emotion, confidence)
VALUES
(1, 'image', 'sample.jpg', 'Happy', 0.97);

INSERT INTO activities
(user_id, emotion, activity_name)
VALUES
(1, 'Happy', 'Emotion Flashcards');