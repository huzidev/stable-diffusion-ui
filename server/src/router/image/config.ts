import axios from "axios";
import fs from "fs";
import path from "path";

async function generateImg(config: any) {
    try {
        let latestImage: any = "";
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

module.exports.generateImg = generateImg;