import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from 'express';
import fs from "fs";
import path from "path";
const server: Express  = express();

const port = 8080;

server.use(cors({
    origin: "*"
}));

server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));

server.get("/get", (req: Request, res: Response) => {
    res.status(200).send("HEllo");
})


let latestImage: any = "";
server.post("/test", (req: Request, res: Response) => {
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

server.get("/latest-img", (req: Request, res: Response) => {
    res.status(202).json({ image: latestImage })
})

server.use("/images", express.static("images"));

server.get("/models", (req: Request, res: Response) => {
    try {
        const config = {
        method: 'get',  
        url: 'http://127.0.0.1:7860/sdapi/v1/sd-models',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async function getModels(params:type) {
        const res = await axios(config);
        
    }
    getModels();
    } catch (e) {
        console.log("Error", e);
        
    }
})



server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})