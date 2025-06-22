class Tasks {
    constructor(database) {
        this.db = database;
    }
    async findAll(filterOptions) {
        let query = `SELECT * from task`;
        let limit = 1000
        let offset = 0
        Object.keys(filterOptions).forEach(filterKey => {
            switch(filterKey.toLowerCase()) {
                case "pipe_id": {
                    query += " ";
                    query += `WHERE fk_pipe = ${filterOptions[filterKey]}`;
                    break;
                }
                case "search_for": {
                    query += " ";
                    query += `WHERE title LIKE "%${filterOptions[filterKey]}%" OR description LIKE "%${filterOptions[filterKey]}%"`;
                    break;
                }
                case "page": {
                    const value = parseInt(filterOptions[filterKey]);
                    if(isNaN(value) === false) {
                        offset = value;
                    }
                    break;
                }
                case "page_size": {
                    const value = parseInt(filterOptions[filterKey])
                    if(isNaN(value) === false) {
                        limit = value;
                    }
                    break;
                }
            }
        })
        query += " ";
        query += `LIMIT ${limit} OFFSET ${offset}`
        console.log(`Tasks::FindAll`, {query})
        try {
            const result = await this.db.all(query);
            return result;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
    async findById(id, filterOptions) {
        let query = `SELECT * from task WHERE id=${parseInt(id)}`;
        console.log(`Tasks::FindById`, {query})
        try {
            const result = await this.db.all(query);
            return result;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
    async updateTask(id, data) {
        let query = `UPDATE task SET title="${data.title}", description="${data.description}", fk_pipe=${data.fk_pipe}, fk_status=${data.fk_status} WHERE id=${parseInt(id)}`;
        console.log(`Tasks::FindById`, {query})
        try {
            const result = await this.db.all(query);
            return result;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
}

export default Tasks;