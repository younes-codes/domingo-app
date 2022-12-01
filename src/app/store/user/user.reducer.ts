import {User} from "../../models/user.model";
import * as UserActions from "./user.actions";
import {userState} from "./user.state";

const addUser = (user: User) => {
    const userCopy = {...userState};
    userCopy.firstname = user.firstname;
    userCopy.lastname = user.lastname;
    userCopy.email = user.email;
    userCopy.password = user.password;
    userCopy.role = user.role;
    userCopy.tjm = user.tjm;
    userCopy.client = user.client;

    return userCopy;
};

export function userReducer(state = userState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.ADD_USER:
            return addUser(action.payload.user);
        default:
            return userState;
    }
}
