DROP DATABASE IF EXISTS recipe_db;

CREATE DATABASE recipe_db;

USE recipe_db;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS recipes;

CREATE TABLE user(
    userID INT auto_increment PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    userPass VARCHAR(64) NOT NULL

);

CREATE TABLE recipes(
    recipeID INT auto_increment PRIMARY KEY,
    recipeName VARCHAR(50) NOT NULL,
    ingredients JSON,
    instructions VARCHAR(500) NOT NULL,
    userID INT,
    CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
);