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
        width,
        height,
        n_iter,
        cfg_scale,
        sampler_name,
        restore_faces,
    }
    
    var data = JSON.stringify(jsonData);
    
    const config = {
        method: 'post',  
        url: endpoints.API,
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