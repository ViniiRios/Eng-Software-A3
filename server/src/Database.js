import sqlite3 from "sqlite3";
import { existsSync, mkdirSync } from "node:fs"
const NOME_ARQUIVO = "db-super-secreto.db"

class Database {
    constructor() {
        this._createFileIfNotExists();
        this._openConnectionWithFile();
        this._createSchemaIfNotExists();
        // this._populateTableStatus();
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
            VALUES (1, "a fazer"), (2, "fazendo"), (3, "feito")
        `);
    }
}

export default Database;