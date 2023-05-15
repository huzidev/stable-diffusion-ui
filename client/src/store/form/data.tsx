import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const prompts: string = "an anime character holding sword";

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

export const generateImg = createAsyncThunk('form/data', async () => {
    console.log("prompt from redux", prompts);
    const res = await axios(config);
    console.log("generating image");
    console.log("Res from redux", res);
})
