import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";

const initialState = {
    contacts: [],
    filter: ""
};

const reduser = (state = initialState) => {
    return state;
}

const enhanser = devToolsEnhancer();

const store = createStore(reduser, enhanser);

export default store;