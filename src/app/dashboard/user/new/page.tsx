import Layout from "@/components/Dashboard/Layout";
import SignupCard from "@/components/Dashboard/User/Card/SignupCardAdmin";

export default function NewUser() {
    return (
        <>
            <Layout>
                <div className="h-screen flex items-center justify-center">
                    <SignupCard />
                </div>
            </Layout>
        </>
    )
}