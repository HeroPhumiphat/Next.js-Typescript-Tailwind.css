import { configureStore } from "@reduxjs/toolkit";
import TextSlice from "./TextIndexPage/TextSlice";

const store = configureStore({
    reducer: {
        text: TextSlice,
    }
})

export default store;