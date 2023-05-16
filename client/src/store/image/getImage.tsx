import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DataType } from "./Types";

const initialState: DataType = {
    imageLink: 'no image here'
}

let testImg: any = "";

export const getImage = createAsyncThunk("images/getImage", async () => {
    try {
        const response = await axios("http://localhost:8080/latest-img");
        const data = response.data;
        testImg = data.image;
        // return data.image;
    } catch (e) {
        console.log("Error", e);
    }
});

const getImageSlice = createSlice({
    name: "image",
    initialState,
    reducers : {
        testImag(state) {
            state.imageLink = testImg
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getImage.fulfilled, (state, action) => {
            state.imageLink = action.payload;
        })
    }
})

export default getImageSlice.reducer;

export const imageAction = getImageSlice.actions;