import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as endpoints from "./endpoints";
import { JsonState } from "./types";

export const generateImg = createAsyncThunk(endpoints.FORM, async (settings: any) => {
    console.log("prompt from redux", settings);
    const { prompt, steps, cfg_scale, restore_faces, n_iter, width, height } = settings;
    try {
        var data: JsonState = {
            prompt,
            steps,
            cfg_scale,
            restore_faces,
            n_iter,
            width,
            height
        };
        const config = {
            method: 'post',
            url: endpoints.API,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };
        await axios(config);
        console.log("generating image");
    } catch (e) {
        console.log("Error", e);
    }
})