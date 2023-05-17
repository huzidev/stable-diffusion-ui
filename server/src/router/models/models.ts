import axios, { AxiosResponse } from "axios";
import express, { Request, Response } from 'express';
import * as endpoints from "./endpoints";

const router = express.Router();

router.get("/models", async (req: Request, res: Response) => {
    try {
    const config = {
        method: 'get',  
        url: endpoints.API,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response: AxiosResponse<any[]> = await axios(config);
    const models = response.data;
    const newArr = models.map((obj) => obj.title)
    console.log("Models", newArr);
    res.json(newArr);
    } catch (e) {
        console.log("Error", e);
    }
});

module.exports = router;