import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login-Slice";
import signupReducer from "./Signup-Slice";
import todoReducer from "./Todo-Slice";
import homeReducer from "./Home-Slice";
import { baseURL } from "./API's/baseURL";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [baseURL.reducerPath]: baseURL.reducer,
        login: loginReducer,
        signup: signupReducer,
        todo: todoReducer,
        home: homeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseURL.middleware),
})

setupListeners(store.dispatch);

export default store;