import { readdirSync } from "fs";
import { readdir } from "fs/promises";

export async function GET() {
    const directoryPath = process.cwd() + "/folders"
    try {
        const folders = await readdir(directoryPath);
        const files = {}

        folders.forEach(folder => {
            files[folder] = readdirSync(directoryPath + "\\" + folder);
        })

        return Response.json(files)
    } catch (err) {
        console.log("Unable to scan directory: " + err);
    }
}