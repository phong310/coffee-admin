// config with redux persist
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "./autSlice";
import userReducer from './userSlice';
import orderReducer from "./orderSlice"
import cateReducer from "./cateSlice"
import productReducer from "./productSlice"
import newsReducer from "./newsSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    userList: userReducer,
    orderList: orderReducer,
    category: cateReducer,
    product: productReducer,
    newsList: newsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);


// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from "./autSlice";
// import userReducer from './userSlice';
// import orderReducer from "./orderSlice"
// import productReducer from "./productSlice"

// export const store = configureStore({
//     reducer: { auth: authReducer, userList: userReducer, orderList: orderReducer, product: productReducer },
// })

