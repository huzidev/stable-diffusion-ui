import axios from "axios";
import cors from "cors";
import express, { Request, Response } from 'express';
import path from "path";
const server = express();

const port = 8080;

server.use(cors({
    origin: "*"
}));

var data = JSON.stringify({
    "prompt": "village in winter season",
    "steps": 5,
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

server.use(cors({
    origin: "*"
}));

async function gen() {
    try {
        const result = await axios(config);
        const { images, info } = result.data;
        const filename = Date.now();
        for (const image of images) {
            const buffer = Buffer.from(image, "base64");
            const imgPath = path.join(`images/`, `${filename}.png`);
        }
        console.log("Res", result);
    } catch (e) {
        console.log("Error", e);
        
    }
}

server.get("/get", (req: Request, res: Response) => {
    res.status(200).send("HEllo");
})

server.post("/test", (req: Request, res: Response) => {
    const data = req.body;
    console.log("data", data);
    gen();
    res.status(200).send("Image generated succescully!")
})


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})