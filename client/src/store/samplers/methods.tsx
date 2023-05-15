import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMethods = createAsyncThunk("models/getMethods", async () => {
    try {
        const res = await axios("http://localhost:8080/methods");
        console.log("Res from redux", res);
    } catch (e) {
        console.log("Error", e);
    }
})