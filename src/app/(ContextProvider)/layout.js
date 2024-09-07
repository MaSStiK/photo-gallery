"use client";
import { useState, useContext } from "react"
import { DataContext } from "@/components/Context"

export default function Layout({ children }) {
    const Context = useContext(DataContext)

    const [ContextFolders, setContextFolders] = useState([]);
    Context.Folders = ContextFolders
    Context.setFolders = setContextFolders

    return (
        <DataContext.Provider value={Context}>
            {children}
        </DataContext.Provider>
    );
}
