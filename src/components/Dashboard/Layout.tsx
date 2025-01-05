"use client"
import React, { createContext, useContext, useState } from "react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Root {
    children?: React.ReactNode;
}

interface LoadingContextProps {
    showLoading: boolean
    setShowLoading: (value: boolean) => void;
}

// สร้าง Context
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// Hook สำหรับใช้ Context
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

// Layout Component
export default function Layout({ children }: Root) {
    const [showLoading, setShowLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
            <div className="flex h-screen w-full relative">
                {showLoading && <Loading />}
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="w-full bg-gray-200 h-screen overflow-y-scroll relative">
                    <Navbar />
                    {children}
                </div>
            </div>
        </LoadingContext.Provider>
    );
}
