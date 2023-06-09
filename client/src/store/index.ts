import { configureStore } from "@reduxjs/toolkit";
import getImage from "./image/actions";

const store = configureStore({
    reducer : {
        image: getImage
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch