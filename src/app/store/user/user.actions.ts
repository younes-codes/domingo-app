import {Action} from "@ngrx/store";
import {User} from "../../models/user.model";

export const ADD_USER = 'ADD_USER';

export class UserActions implements Action {
    readonly type = ADD_USER;

    constructor(public payload: { user: User }) {
    }
}
