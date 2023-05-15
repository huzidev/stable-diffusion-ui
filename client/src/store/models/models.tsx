import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getModels = createAsyncThunk("models/getModels", async () => {
    try {
        const res = await axios("http://localhost:8080/models");
    } catch (e) {
        console.log("Error", e);
    }
})