import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState: Credentials = {
//     loading: false,
//     res: "",
//     error: ''
// }


export const generateImg = createAsyncThunk('form/data', async (prompt: any) => {
    const { prompts } = prompt;
    try {
        var data = JSON.stringify({
            "prompt": prompts
            // "steps": 20,
            // "cfg_scale": 7,
            // "sampler_name": "Heun",
            // "batch_size": 1,
            // "width": 512,
            // "height": 512,
            // "seed": -1,
        });
        
        const config = {
            method: 'post',
            url: "http://localhost:8080/test",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const res = await axios(config);
        console.log("generating image");
    } catch (e) {
        console.log("Error", e);
        
    }
})

const imageSlice = createSlice({
    name: "image",
    initialState: {},
    reducers: {},
})

export default imageSlice.reducer;