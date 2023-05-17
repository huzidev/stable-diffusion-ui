import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as endpoints from "./endpoints";
import { ImageAddress } from "./types";

const initialState: ImageAddress = {
    imageLink: 'no image here'    
}

export const getImage = createAsyncThunk(endpoints.IMAGE, async () => {
    try {
        const response = await axios(endpoints.API);
        const data = response.data;
        return data.image;
    } catch (e) {
        console.log("Error", e);
    }
});

const getImageSlice = createSlice({
    name: "image",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getImage.fulfilled, (state, action) => {
            state.imageLink = action.payload;
        })
    }
})

export default getImageSlice.reducer;

export const imageAction = getImageSlice.actions;