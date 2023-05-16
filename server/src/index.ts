import bodyParser from "body-parser";
import express, { Express, Request, Response } from 'express';
const server: Express  = express();
const port = 8080;
const auth = require("../router/auth");
const image = require("../router/resp/image");

server.use(express.json());
server.use(auth);
server.use(image);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));

server.get("*", (req: Request, res: Response) => {
    res.send({ message: "Hello, world" });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});