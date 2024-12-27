export default function Loading() {
    return (
        <>
            <div className="h-screen absolute top-0 left-0 w-full z-50 flex flex-col justify-center items-center bg-white">
                <h1 className="text-xl text-gray-500">
                    กำลังโหลด
                </h1>
                <span className="loading loading-dots loading-lg mt-3"></span>
            </div>
        </>
    )
}