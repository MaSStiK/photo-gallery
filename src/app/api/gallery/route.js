import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { readdirSync, statSync, lstatSync } from "fs";
import path from "path";

export async function GET() {
    const directoryPath = `${process.cwd()}/gallery`;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const gallery = [];

    try {
        const foldersArray = await readdir(directoryPath);

        for (const folderName of foldersArray) {
            const folderPath = path.join(directoryPath, folderName);
            if (!lstatSync(folderPath).isDirectory()) continue;

            const innerItems = readdirSync(folderPath);
            const files = [];
            const previews = [];

            for (const file of innerItems) {
                const filePath = path.join(folderPath, file);
                if (!lstatSync(filePath).isFile()) continue;

                const ext = path.extname(file).toLowerCase();
                const base = path.basename(file, ext).toLowerCase();

                if (imageExtensions.includes(ext)) {
                    if (base.endsWith("_preview")) {
                        previews.push(file);
                    } else {
                        files.push(file);
                    }
                }
            }

            // Выбрать первый preview или null
            const folderPreview = previews.length > 0 ? previews[0] : null;

            gallery.push({
                folderName,
                birthtimeMs: statSync(folderPath).birthtimeMs,
                files,
                previews,
                folderPreview,
            });
        }

        return NextResponse.json({ gallery });
    } catch (err) {
        console.error("Unable to scan directory:", err);
        return NextResponse.error();
    }
}
