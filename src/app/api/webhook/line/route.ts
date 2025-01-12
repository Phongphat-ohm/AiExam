export async function POST(req: Request) {
    try {
        console.log(await req.json());

        return Response.json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 500,
            message: "something went wrong"
        })
    }
}