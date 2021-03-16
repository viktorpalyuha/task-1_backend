CREATE TABLE game (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  img_url VARCHAR(150) NOT NULL,
  developer VARCHAR(50) NOT NULL,
  price BIGINT NOT NULL
);

INSERT INTO game (name, img_url, developer, price) VALUES ('Seasonal Event - Cossacks 3: Summer Fair', 
'https://steamcdn-a.akamaihd.net/steam/apps/650291/header.jpg?t=1499435861', 'GSC Game World', 32);
INSERT INTO game (name, img_url, developer, price) VALUES ('Journey of the Sword', 
'https://steamcdn-a.akamaihd.net/steam/apps/650310/header.jpg?t=1548933923', 'Cipher Hive', 48);
INSERT INTO game (name, img_url, developer, price) VALUES ('Mega Maze', 
'https://steamcdn-a.akamaihd.net/steam/apps/658210/header.jpg?t=1572981467', 'Chronova', 1);



CREATE TABLE category (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO category (name) VALUES ('Single-player');
INSERT INTO category (name) VALUES ('Co-op');
INSERT INTO category (name) VALUES ('PvP');
INSERT INTO category (name) VALUES ('Online');
INSERT INTO category (name) VALUES ('Cross-platform');

CREATE TABLE game_categories (
  game_id BIGINT REFERENCES game(id) NOT NULL,
  category_id BIGINT REFERENCES category(id) NOT NULL
);

INSERT INTO game_categories (game_id, category_id) VALUES (1, 1);
INSERT INTO game_categories (game_id, category_id) VALUES (1, 2);
INSERT INTO game_categories (game_id, category_id) VALUES (1, 3);


SELECT game.name as game_name FROM game JOIN game_categories ON game.id = game_categories.game_id;
SELECT game.name as game_name, category.name as category_name FROM game INNER JOIN game_categories ON game.id = game_categories.game_id INNER JOIN category ON category.id = game_categories.category_id;
