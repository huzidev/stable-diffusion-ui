import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as endpoints from "./endpoints";
import { DataType } from "./types";

export const generateImg = createAsyncThunk(endpoints.FORM, async (prompt: any) => {
    const { prompts } = prompt;
    try {
        var data: DataType = {
            "prompt": prompts,
            // "steps": 5,
            // "cfg_scale": 7,
            // "sampler_name": "Heun",
            // "batch_size": 1,
            // "width": 512,
            // "height": 512,
            // "seed": -1,
        };
        var jsonString = JSON.stringify(data);
        const config = {
            method: 'post',
            url: endpoints.API,
            headers: {
                'Content-Type': 'application/json'
            },
            data: jsonString
        };
        await axios(config);
        console.log("generating image");
    } catch (e) {
        console.log("Error", e);
    }
})