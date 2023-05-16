import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from 'express';
import fs from "fs";
import path from "path";

const router = express.Router();

router.use(cors({
    origin: "*"
}));

router.use(bodyParser.urlencoded({ extended : false }));

let latestImage: any = "";
router.post("/generate", (req: Request, res: Response) => {
    const { prompt } = req.body;
    console.log("resp", prompt);
    var data = JSON.stringify({
        prompt,
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
})

router.get("/latest-img", (req: Request, res: Response) => {
    res.status(202).json({ image: latestImage })
})

router.use("/images", express.static("images"));

router.get("/models", (req: Request, res: Response) => {
    try {
        const config = {
            method: 'get',  
            url: 'http://127.0.0.1:7860/sdapi/v1/sd-models',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    async function getModels() {
        const res = await axios(config);
        let models = res.data;
        let newArr: any = [];
        models.forEach((obj: any) => {
            newArr.push(obj.model_name);
        });
        console.log("newArr", newArr);
    }
    getModels();
    } catch (e) {
        console.log("Error", e);
    }
})

router.get("/methods", (req: Request, res: Response) => {
    try {
        const config = {
            method: 'get',  
            url: 'http://127.0.0.1:7860/sdapi/v1/samplers',
            headers: {  
                'Content-Type': 'application/json'
            }
        };
        async function getMethods() {
            const res = await axios(config);
            let samples = res.data;
            let newArr = [];
            samples.forEach((obj) => {
                newArr.push(obj.name);
            })
            console.log("Samplers", newArr);
        }
        getMethods()
    } catch (e) {
        console.log("Error", e);
    }
})

module.exports = router;