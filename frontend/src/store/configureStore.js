import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import axiosApi from "../axiosApi";
import artistsReducer from "./reducers/artistsReducer";
import albumsReducer from "./reducers/albumsRudecer";
import tracksReducer from "./reducers/tracksReducer";
import trackHistoryReducer from "./reducers/trackHistoryReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artistsCombine: artistsReducer,
    albumsCombine: albumsReducer,
    tracksCombine: tracksReducer,
    users: usersReducer,
    trackHistory: trackHistoryReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
    }

    return config;
});

export default store;