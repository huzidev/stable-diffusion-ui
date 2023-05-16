import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DataType } from "./Types";

const initialState: DataType = {
    image: ''
}

export const getModels = createAsyncThunk("models/getModels", async () => {
    try {
        const response = await axios("http://localhost:8080/latest-img");
        const data = response.data;
    } catch (e) {
        console.log("Error", e);
    }
});

const 