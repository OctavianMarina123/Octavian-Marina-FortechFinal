import {AnyAction} from "redux";
import * as loginActionTypes from "./accountAcionTypes"

const initialState = {
    account: '',
}

export const accountReducer = (state = initialState, action: AnyAction) => {
    const { account } = state;
    const {payload, type} = action;
    switch (type) {
        case loginActionTypes.setAccount:
            return { ...state, account: payload.account};
        default:
            return state;
    }
};