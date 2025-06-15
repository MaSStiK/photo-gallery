"use client";
import { DataProvider  } from "@/components/Context"

export default function Layout({ children }) {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    );
}
