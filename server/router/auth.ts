import axios from "axios";
import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/models", (req: Request, res: Response) => {
    try {
        let newArr: any = [];
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
        models.forEach((obj: any) => {
            newArr.push(obj.model_name);
        });
        console.log("newArr", newArr);
    }
    getModels();
    res.status(201).send({ message: "Models fetched successfully!" });
    res.json(newArr);
    } catch (e) {
        console.log("Error", e);
    }
})

router.get("/methods", (req: Request, res: Response) => {
    try {
        let newArr = [];
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
            samples.forEach((obj) => {
                newArr.push(obj.name);
            })
            console.log("Samplers", newArr);
        }
        getMethods();
        if (newArr) {
            console.log("will it work");
            res.json(newArr);
        }
        // res.status(202).send({ message: "Sample methods fetched successfully!" });
    } catch (e) {
        console.log("Error", e);
    }
});

module.exports = router;