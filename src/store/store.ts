import {legacy_createStore as createStore} from "redux";
import {reducer} from "./reducer";
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    version:1,
    storage
}

const persistedReducer= persistReducer(persistConfig,reducer);


export const store = createStore(reducer);
export type RootState = ReturnType<typeof store.getState>;
console.log(store.getState());