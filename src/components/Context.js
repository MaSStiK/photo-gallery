"use client";
import { createContext } from "react";

// Создание контекста приложения
export const DataContext = createContext({})

export function DataProvider({ children }) {
    return (
        <DataContext.Provider value={DataContext}>
            {children}
        </DataContext.Provider>
    )
}