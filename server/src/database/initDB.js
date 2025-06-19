import sqlite3 from "sqlite3";
const db = new sqlite3.Database("db-super-secreto.db", sqlite3.OPEN_READWRITE);

export function initDB() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS pipe (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(256) NOT NULL
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS status (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(256) NOT NULL
        )
    `);
    db.exec(`
        DELETE FROM status
    `)
    db.exec(`
        INSERT INTO status(id, name)
        VALUES (1, "a fazer"), (2, "fazendo"), (3, "feito")
    `)
    db.exec(`
        CREATE TABLE IF NOT EXISTS task (
            id INT PRIMARY KEY NOT NULL,
            title VARCHAR(256) NOT NULL,
            description VARCHAR(512) NOT NULL,
            fk_pipe INT,
            fk_status INT,
            FOREIGN KEY(fk_pipe) REFERENCES pipe(id),
            FOREIGN KEY(fk_status) REFERENCES status(id)
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(256) NOT NULL,
            email VARCHAR(512) NOT NULL,
            password VARCHAR(256) NOT NULL
        )
    `);
}
