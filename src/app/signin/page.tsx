
import Navbar from "@/components/Navbar";
import SigninCard from "@/components/Signin/SigninCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "เข้าสู่ระบบ | Xammy",
    description: "Generated by create next app",
};

export default function SignInPage() {
    return (
        <>
            <Navbar />
            <div className="h-screen flex items-center justify-center bg-gray-200">
                <SigninCard />
            </div>
        </>
    )
}