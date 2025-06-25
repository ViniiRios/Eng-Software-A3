class Pipes {
    constructor(database) {
        this.db = database;
    }
    async findAll(filterOptions) {
        let query = `SELECT id, name from pipe`;
        let limit = 1000
        let offset = 0
        Object.keys(filterOptions).forEach(filterKey => {
            switch(filterKey.toLowerCase()) {
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
        console.log(`Pipes::FindAll`, {query})
        try {
            const result = await this.db.all(query);
            return result;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
    async create({name}) {
        let [lastPipeCreated] = await this.db.all(`SELECT id from pipe ORDER BY id DESC LIMIT 1`);
        if(!lastPipeCreated) lastPipeCreated = {id: 0}
        let query = `INSERT into pipe(id, name) VALUES (${lastPipeCreated.id+1},"${name}")`;
        console.log(`Pipes::create`, {query})
        await this.db.run(query)
        const response = {
            id: lastPipeCreated.id+1,
            name
        }
        return response
    }
}

export default Pipes;