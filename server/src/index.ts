import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from 'express';
const server: Express  = express();
const port = 8080;
const auth = require("./router/image/index");
const image = require("./router/models/index");
const models = require("./router/models/index");

server.use(cors({
    origin: "*"
}));

server.use(express.json());
server.use(auth);
server.use(image);
server.use(models);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));

server.get("*", (req: Request, res: Response) => {
    res.send({ message: "Hello, world" });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});