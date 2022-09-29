import {AnyAction} from "redux";
import * as fileActionTypes from "./fileActionTypes"

const initialState = {
    acceptedFiles: [],
}

export const fileReducer = (state = initialState, action: AnyAction) => {
    const { acceptedFiles } = state;
    const {payload, type} = action;
    switch (type) {
        case fileActionTypes.setFile:
            return { ...state, acceptedFiles: payload.acceptedFiles};
        default:
            return state;
    }
};