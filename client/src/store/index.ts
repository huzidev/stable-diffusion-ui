import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./form/data";

const store = configureStore({
    reducer : {
        image: imageReducer
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch