import {AnyAction} from "redux";
import * as signUpActionTypes from "./signUpActionTypes"

const initialState = {
    usernameSignUp: '',
    passwordSignUp: '',
    confirmPassword: '',
}

export const signUpReducer = (state = initialState, action: AnyAction) => {
    const {usernameSignUp} = state;
    const {passwordSignUp} = state;
    const{confirmPassword}=state;
    const {payload, type} = action;
    switch (type) {
        case signUpActionTypes.setUsernameSignUp:
            return { ...state, usernameSignUp: payload.usernameSignUp};
        case signUpActionTypes.setPasswordSignUp:
            return { ...state, passwordSignUp: payload.passwordSignUp};
        case signUpActionTypes.setConfrimPassword:
            return { ...state, confirmPassword: payload.confirmPassword};
        default:
            return state;
    }
};