import {AnyAction} from "redux";
import * as loginActionTypes from "./loginActionTypes"

const initialState = {
    username: '',
    password: '',
}

export const loginReducer = (state = initialState, action: AnyAction) => {
    const {username} = state;
    const {password} = state;
    const {payload, type} = action;
    switch (type) {
        case loginActionTypes.setUsername:
            return { ...state, username: payload.username};
        case loginActionTypes.setPassword:
            return { ...state, password: payload.password};
        default:
            return state;
    }
};