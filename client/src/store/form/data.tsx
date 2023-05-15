import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var data = JSON.stringify({
    "prompt": "village in winter season",
    "steps": 20,
    "cfg_scale": 7,
    "sampler_name": "Heun",
    "batch_size": 1,
    "width": 512,
    "height": 512,
    "seed": -1,
});

const config = {
    method: 'post',
    url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

export const generateImg = createAsyncThunk('form/data', async () => {
    const res = await axios(config);
    console.log("generate image");
    console.log(res);
})
