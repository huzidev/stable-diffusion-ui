import axios, { AxiosResponse } from "axios";
import express, { Request, Response } from 'express';
import { config } from "./config";
import * as endpoints from "./endpoints";

const router = express.Router();

router.get(endpoints.METHOD, async (req: Request, res: Response) => {
    try {
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