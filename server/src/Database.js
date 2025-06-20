import sqlite3 from "sqlite3";
import { existsSync, mkdirSync } from "node:fs"
const NOME_ARQUIVO = "db-super-secreto.db"

class Database {
    constructor() {
        this._createFileIfNotExists();
        this._openConnectionWithFile();
        this._createSchemaIfNotExists();
        this._populateTableStatus();
    }

    exec(unsafeQuery) {
        return this.db.exec(unsafeQuery);
    }

    _sanitize(unsafeQuery) {}
    _openConnectionWithFile() {
        try {
            this.db = new sqlite3.Database(NOME_ARQUIVO, sqlite3.OPEN_READWRITE);
        }
        catch(e) {
            throw new Error(e);
        }
    }
    _createSchemaIfNotExists() {
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
    _createFileIfNotExists() {
        if(!existsSync(NOME_ARQUIVO))
            mkdirSync(NOME_ARQUIVO);
    }

    _populateTableStatus() {
        this.exec(`
            DELETE FROM status
        `);
        this.exec(`
            INSERT INTO status(id, name)
            VALUES (1, "a fazer"), (2, "fazendo"), (3, "feito")
        `);
    }
}