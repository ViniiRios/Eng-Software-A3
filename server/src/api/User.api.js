import AbstractAPI from "./Abstract.api.js";
class UserAPI extends AbstractAPI {
    constructor() {
        super()
    }

    getUsers() {
        return {user: true}
    }
}
export default UserAPI;