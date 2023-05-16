import axios from "axios";
import express, { Request, Response } from 'express';
import fs from "fs";
import path from "path";

const router = express.Router();

let latestImage: any = "";
router.post("/generate", (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log("resp", prompt);
    var data = JSON.stringify({
        prompt,
        "steps": 30,
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
    async function gen() {
        try {
            const result = await axios(config);
            const { images, info } = result.data;
            const filename = Date.now();
            for (const image of images) {
                const buffer = Buffer.from(image, "base64");
                const imgPath = path.join(`images`, `${filename}.png`);
                fs.writeFileSync(imgPath, buffer);
                latestImage = `${filename}.png`;
                console.log("latest image name", latestImage);
            }
        } catch (e) {
            console.log("Error", e);
            
        }
    }
    gen();
    res.status(200).send({ message: "Image generated succescully!" });
});


router.get("/latest-img", (req: Request, res: Response) => {
    res.status(202).json({ image: latestImage })
});

router.use("/images", express.static("images"));

module.exports = router;