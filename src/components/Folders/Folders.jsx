import "./Folders.css"

import { readdir } from 'fs/promises';

async function readFiles() {
    const directoryPath = process.cwd() + "/public/folders"
    try {
        const files = await readdir(directoryPath);
        return files
    } catch (err) {
        console.log("Unable to scan directory: " + err);
    }
}

export default async function Folders() {
    const Folders = await readFiles()
    
    return (
        <div className="folders">
            {Folders.map((folder, i) => (
                <div key={i}>
                    <p>{folder}</p>
                </div>
            ))}
        </div>
    )
}
