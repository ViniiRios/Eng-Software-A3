import sqlite3 from "sqlite3";
import { existsSync, mkdirSync } from "node:fs"
const NOME_ARQUIVO = "db-super-secreto.db"

class Database {
    constructor() {
        this._createFileIfNotExists();
        this._openConnectionWithFile();
        this._createSchemaIfNotExists();
        this._populateTableStatus();
        this._populateTablePipes();
        this._populateTableTasks();
    }

    async run(unsafeQuery) {
        return new Promise((resolve, reject) => {
            this.db.run(unsafeQuery, (error) => {
                if(error) reject(error);
                resolve(true);
            })
        })
    }

    async all(unsafeQuery) {
        return new Promise((resolve, reject) => {
            this.db.all(unsafeQuery, (error, result) => {
                if(error) reject(error);
                resolve(result);
            })
        })
    }

    _openConnectionWithFile() {
        try {
            this.db = new sqlite3.Database(NOME_ARQUIVO, sqlite3.OPEN_READWRITE);
        }
        catch(e) {
            throw new Error(e);
        }
    }
    _createSchemaIfNotExists() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS pipe (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL
            )
        `);
        this.db.run(`
            CREATE TABLE IF NOT EXISTS status (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL
            )
        `);
        this.db.run(`
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
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                email VARCHAR(512) NOT NULL,
                password VARCHAR(256) NOT NULL
            )
        `);
    }
    _createFileIfNotExists() {
        if(!existsSync(NOME_ARQUIVO))
            mkdirSync(NOME_ARQUIVO);
    }

    _populateTableStatus() {
        this.run(`
            DELETE FROM status
        `);
        this.run(`
            INSERT INTO status(id, name)
            VALUES (1, "pendente"), (2, "completo"), (3, "cancelado")
        `);
    }

    _populateTablePipes() {
        this.run(`
            DELETE FROM pipe
        `);
        this.run(`
            INSERT INTO pipe(id, name)
            VALUES (1, "a fazer"), (2, "fazendo"), (3, "feito")
        `);
    }

    _populateTableTasks() {
        this.run(`
            DELETE FROM task
        `);
        this.run(`
            INSERT INTO task(id, title, description, fk_pipe, fk_status) VALUES 
            (0, "Task 0", "Description 0", 1, 1),
            (1, "Task 1", "Description 1", 1, 1),
            (2, "Task 2", "Description 2", 1, 1),
            (3, "Task 3", "Description 3", 1, 1),
            (4, "Task 4", "Description 4", 1, 1),
            (5, "Task 5", "Description 5", 1, 1),
            (6, "Task 6", "Description 6", 1, 1),
            (7, "Task 7", "Description 7", 1, 1),
            (8, "Task 8", "Description 8", 1, 1),
            (9, "Task 9", "Description 9", 1, 1),

            (10, "Task 10", "Description 10", 2, 1),
            (11, "Task 11", "Description 11", 2, 1),
            (12, "Task 12", "Description 12", 2, 1),
            (13, "Task 13", "Description 13", 2, 1),
            (14, "Task 14", "Description 14", 2, 1),
            (15, "Task 15", "Description 15", 2, 1),
            (16, "Task 16", "Description 16", 2, 1),
            (17, "Task 17", "Description 17", 2, 1),
            (18, "Task 18", "Description 18", 2, 1),
            (19, "Task 19", "Description 19", 2, 1),

            (20, "Task 20", "Description 20", 3, 1),
            (21, "Task 21", "Description 21", 3, 1),
            (22, "Task 22", "Description 22", 3, 1),
            (23, "Task 23", "Description 23", 3, 1),
            (24, "Task 24", "Description 24", 3, 1),
            (25, "Task 25", "Description 25", 3, 1),
            (26, "Task 26", "Description 26", 3, 1),
            (27, "Task 27", "Description 27", 3, 1),
            (28, "Task 28", "Description 28", 3, 1),
            (29, "Task 29", "Description 29", 3, 1);
        `);
    }
}

export default Database;