class Status {
    constructor(database) {
        this.db = database;
    }
    async findAll(filterOptions) {
        let query = `SELECT * from status`;
        console.log(`Status::FindAll`, {query})
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

export default Status;