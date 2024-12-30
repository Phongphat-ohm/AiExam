import Link from "next/link";
import UserTable from "./Table";

export default function UserIndex() {
    return (
        <>
            <div className="container mx-auto" >
                <div className="pt-20 px-5" >
                    <div className="card shadow bg-white">
                        <div className="card-body">
                            <div className="mb-3 flex gap-3">
                                <Link href={"/dashboard/user/new"} className="btn btn-success font-normal text-white">สมัครสมาชิก</Link>
                            </div>
                            <UserTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}