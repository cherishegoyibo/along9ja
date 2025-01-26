import { User, Route} from '../db_model/database.js';
import { Admin as AdminDB } from '../db_model/database.js';

class Admin {
    constructor() {
        this.User = User;
        this.Route = Route;
        this.AdminDB = AdminDB;
    }

    getAllRoutes() {
        const Routes =  this.Route.find();
        return Routes;
    }

    getAllUsers() {
        const Users =  this.User.find();
        return Users;
    }

    getAllAdmins() {
        const Admins =  this.AdminDB.find();
        return Admins;
    }

    UpdateRoutes(id, data) {
        const UpdateRouteRoute =  this.Route.findByIdAndUpdate(id, data);
        if (UpdateRouteRoute) {
            return 'Route Updated';
        }

    }
}