import axios, { AxiosResponse } from "axios";
import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/methods", async (req: Request, res: Response) => {
    try {
        const config = {
            method: 'get',  
            url: 'http://127.0.0.1:7860/sdapi/v1/samplers',
            headers: {  
                'Content-Type': 'application/json'
            }
        };
        const response: AxiosResponse<any[]> = await axios(config);
        let samples = response.data;
        const newArr = samples.map((obj) => obj.name);
        console.log("Samplers", newArr);
        res.json(newArr)
    } catch (e) {
        console.log("Error", e);
    }
});

module.exports = router;