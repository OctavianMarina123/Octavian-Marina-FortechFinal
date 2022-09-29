import {loginReducer} from "./login/loginSlice";
import {signUpReducer} from "./signUp/signUpSlice";
import {combineReducers} from "redux";
import {accountReducer} from "./account/accountSlice";
import {fileReducer} from "./file/fileSlice";

export const reducer= combineReducers(
    {
        login:loginReducer,
        signUp:signUpReducer,
        account:accountReducer,
        file:fileReducer,
    }
)