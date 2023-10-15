import fs from "fs";

export const imageToBase64 = (filePath: string) => {
    const img = fs.readFileSync(filePath);

    return 'data:image/png;base64,' + Buffer.from(img).toString('base64');
}