"use client";
import { createContext, useState } from "react";

// Создание контекста
export const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [Gallery, setGallery] = useState([]);

    return (
        <DataContext.Provider value={{ Gallery, setGallery }}>
            {children}
        </DataContext.Provider>
    );
}
