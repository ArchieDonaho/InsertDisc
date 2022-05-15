DROP DATABASE IF EXISTS insertdisc_db;
CREATE DATABASE insertdisc_db;

USE insertdisc_db;

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `like`;
DROP TABLE IF EXISTS `vote`;


CREATE TABLE IF NOT EXISTS `user` 
  (
    `id` INTEGER NOT NULL auto_increment , 
    `username` VARCHAR(255) NOT NULL UNIQUE, 
    `email` VARCHAR(255) NOT NULL UNIQUE, 
    `password` VARCHAR(255) NOT NULL, 
    PRIMARY KEY (`id`)
  );

CREATE TABLE IF NOT EXISTS `post` 
  (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255) NOT NULL, 
    `category` VARCHAR(255) NOT NULL, 
    `content` TEXT NOT NULL, 
    `user_id` INTEGER, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  );

CREATE TABLE IF NOT EXISTS `comment` 
  (
    `id` INTEGER NOT NULL auto_increment , 
    `content` TEXT NOT NULL, 
    `user_id` INTEGER, 
    `post_id` INTEGER, 
    `created_at` DATETIME NOT NULL, 
    `updated_at` DATETIME NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, 
    FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
  );


CREATE TABLE IF NOT EXISTS `vote` 
(
  `id` INTEGER auto_increment , 
  `user_id` INTEGER NOT NULL, 
  `post_id` INTEGER NOT NULL, 
  UNIQUE `vote_post_id_user_id_unique` (`user_id`, `post_id`), 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `like` 
(
  `id` INTEGER auto_increment , 
  `user_id` INTEGER NOT NULL, 
  `post_id` INTEGER NOT NULL, 
  UNIQUE `like_post_id_user_id_unique` (`user_id`, `post_id`), 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `likes` 
(
  `id` INTEGER auto_increment , 
  `user_id` INTEGER NOT NULL, 
  `post_id` INTEGER NOT NULL, 
  UNIQUE `likes_post_id_user_id_unique` (`user_id`, `post_id`), 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);