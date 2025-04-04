import Navbar from "@/components/Navbar";
import SignupCard from "@/components/Signup/SignupCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "สมัครสมาชิก | Xammy",
    description: "Generated by create next app",
};

export default function SignInPage() {
    return (
        <>
            <Navbar />
            <div className="h-screen flex items-center justify-center bg-gray-200">
                <SignupCard />
            </div>
        </>
    )
}