class Users {
    constructor() {}

    static findAll(filterOptions) {
        return {
            result: true
        }
    }

    static find(filterOptions) {
        const {nickname} = filterOptions
        return {
            result: true
        }
    }
}
export default Users;