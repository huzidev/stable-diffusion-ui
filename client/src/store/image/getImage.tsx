import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DataType } from "./Types";

const initialState: DataType = {
    imageLink: 'no image here'
}

let latestImage: any;

export const getImage = createAsyncThunk("images/getImage", async () => {
    try {
        const response = await axios("http://localhost:8080/latest-img");
        const data = response.data;
        latestImage = data.image;
    } catch (e) {
        console.log("Error", e);
    }
});

const getImageSlice = createSlice({
    name: "image",
    initialState,
    reducers : {
        // getImageLatest (state) {
        //     state.res = 
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getImage.fulfilled, (state) => {
            state.imageLink = latestImage;
        })
    }
})

export default getImageSlice.reducer;

export const imageAction = getImageSlice.actions;