class Users {
    constructor(database) {
        this.db = database;
    }

    async findAll(filterOptions) {
        let query = `SELECT name, email from users`;
        let limit = 1000
        let offset = 0
        Object.keys(filterOptions).forEach(filterKey => {
            switch(filterKey.toLowerCase()) {
                case "search_for": {
                    query += " ";
                    query += `WHERE name LIKE "%${filterOptions[filterKey]}%"`;
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
        console.log(`Users::FindAll`, {query})
        try {
            const result = await this.db.all(query);
            return result;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }

    find(filterOptions) {
        const {nickname} = filterOptions
        return {
            result: true
        }
    }
}
export default Users;