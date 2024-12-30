import Link from "next/link";
import UserTable from "./Table";

export default function UserIndex() {
    return (
        <>
            <div className="container mx-auto" >
                <div className="pt-20 px-5" >
                    <div className="card shadow bg-white">
                        <div className="card-body">
                            <UserTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}