import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as endpoints from "./endpoints";

export const generateImg = createAsyncThunk(endpoints.FORM, async (prompt: any) => {
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
            url: endpoints.API,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        await axios(config);
        console.log("generating image");
    } catch (e) {
        console.log("Error", e);
    }
})