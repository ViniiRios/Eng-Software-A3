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
}

export default Pipes;