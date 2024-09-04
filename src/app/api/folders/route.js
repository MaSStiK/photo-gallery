import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { readdirSync } from "fs";

export async function GET() {
    const directoryPath = process.cwd() + "/folders"
    try {
        const folders = await readdir(directoryPath);
        const files = []

        folders.forEach(folder => {
            files.push({
                folder: folder,
                files: readdirSync(directoryPath + "/" + folder)
            })
        })

        return NextResponse.json(files)
    } catch (err) {
        console.log("Unable to scan directory: " + err);
    }
}