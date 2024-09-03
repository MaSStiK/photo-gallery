import "./Folders.css"

import { readdir } from 'fs/promises';
import { readdirSync } from 'fs';

async function readFiles() {
    const path = require('node:path'); 
    const directoryPath = path.join(process.cwd(), "folders")
    try {
        const folders = await readdir(directoryPath);
        const files = {}

        folders.forEach(folder => {
            files[folder] = readdirSync(directoryPath + "/" + folder);
        })

        return files
    } catch (err) {
        console.log("Unable to scan directory: " + err);
    }
}

export default async function Folders() {
    const Folders = await readFiles()
    
    return (
        <div className="folders">
            {Object.keys(Folders).map((folder, i) => (
                <div key={i}>
                    <h1>{folder}</h1>
                    {Folders[folder].map((file, i) => (
                        <h3 key={i}>{file}</h3>
                    ))}
                </div>
            ))}
        </div>
    )
}
