import express, { Request, Response } from 'express';
const img = require("./config");

const router = express.Router();

let latestImage: any = "";
router.post("/generate", async (req: Request, res: Response) => {
    const { prompt, steps, cfg_scale, restore_faces, n_iter, sampler_name, width, height } = req.body;
    console.log("req", req.body);
    
    var data = JSON.stringify({
        prompt,
        steps,
        cfg_scale,
        width,
        height,
        restore_faces,
        n_iter,
        sampler_name,
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
    img.generateImg(config);
    // try {
    //     const result = await axios(config);
    //     const { images, info } = result.data;
    //     const filename = Date.now();
    //     for (const image of images) {
    //         const buffer = Buffer.from(image, "base64");
    //         const imgPath = path.join(`images`, `${filename}.png`);
    //         fs.writeFileSync(imgPath, buffer);
    //         latestImage = `${filename}.png`;
    //         console.log("latest image name", latestImage);
    //     }
    // } catch (e) {
    //     console.log("Error", e);
    // }
    res.status(200).send({ message: "Image generated succescully!" });
});


router.get("/latest-img", (req: Request, res: Response) => {
    res.status(202).json({ image: latestImage })
});

router.use("/images", express.static("images"));

module.exports = router;