import express, { Request, Response } from 'express';
import * as endpoints from "./endpoints";
import { PromptState } from './types';
const img = require("./config");

const router = express.Router();

let latestImage: any = "";

router.post(endpoints.GENERATE_IMAGE, async (req: Request, res: Response) => {
    const { prompt, steps, cfg_scale, restore_faces, n_iter, sampler_name, width, height } = req.body;
    console.log("req", req.body);
    
    const jsonData: PromptState = {
        prompt,
        steps,
        cfg_scale,
        width,
        height,
        restore_faces,
        n_iter,
        sampler_name,
    }
    
    var data = JSON.stringify(jsonData);
    
    const config = {
        method: 'post',  
        url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    img.generateImg(config);
    res.status(200).send({ message: "Image generated succescully!" });
});

router.get("/latest-img", (req: Request, res: Response) => {
    res.status(202).json({ image: latestImage })
});

router.use("/images", express.static("images"));

module.exports = router;