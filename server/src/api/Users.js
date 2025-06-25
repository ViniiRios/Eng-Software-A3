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

    async findByEmailAndPassword({email, password}) {
        console.log(email, password)
        let query = `SELECT COUNT(id) as rows FROM users WHERE email="${email.toString().replaceAll(/\d+\=\d+/g, "")}" AND password="${password.toString().replaceAll(/\d+\=\d+/g, "")}"`;
        console.log(`Users::FindAll`, {query})
        try {
            const [result] = await this.db.all(query);
            if(!result.rows) return false;
            return true;
        }
        catch(e) {
            console.error(e)
            return false;
        }
    }
}
export default Users;