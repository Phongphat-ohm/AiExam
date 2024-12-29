import axios, { AxiosRequestConfig } from "axios";
import { log } from "console";

export async function POST(req: Request) {
    const body = await req.json();

    let data = JSON.stringify({
        "content": null,
        "embeds": [{
            "title": "แจ้งเตือนมีการ Commit code มาที่ Repository",
            "url": body.head_commit.url,
            "description": "รายละเอียด",
            "color": 36863,
            "fields": [{
                "name": "ชื่อ Commit",
                "value": body.head_commit.message
            },
            {
                "name": "ผู้ Commit",
                "value": body.pusher.name
            }],
            "author": {
                "name": "Github",
                "url": "https://github.com",
                "icon_url": "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            },
            "footer": {
                "text": "Commit มาเมื่อ"
            },
            "timestamp": body.head_commit.timestamp,
            "thumbnail": {
                "url": body.sender.avatar_url
            }
        }]
    });

    try {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://discordapp.com/api/webhooks/1322946031360413726/BmFfWEwoliGkQhGD4ROtkeWi_yD9zwNQxdS-xtO4jGpuNWfLBc6itz0mjJiPX_Qpi55A',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__cf_bm=tEM.C0tKo_DWgC7H0StzFCMqu8hvfivB.8sTe8tX2zQ-1735488329-1.0.1.1-L.zNMUk8bs81fXYVIBRrLK1HcVjgaG0vSwdUGcJmj__bx0YgQqBfv35BHbJio3N_mmy7.j4xrTANnYxK9LajUQ; __cfruid=3259cf5d02e92b90f675ce86bb0134c73e8d1221-1735488329; __dcfduid=b96dcc88c5fe11efa1e91e4eb48ac1c9; __sdcfduid=b96dcc88c5fe11efa1e91e4eb48ac1c96dffc59c31429dfdbef368df7f9f55d9db0270ff531a16b01a33f15889fd8561; _cfuvid=PTnIet1gnwimbzo7qU20SWme9FQIJOUKKYgcEv37MXU-1735488329654-0.0.1.1-604800000'
            },
            data: data
        };

        const request = await axios(config);

        return new Response(JSON.stringify({ status: 200 }), { status: 200 });
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        return new Response(JSON.stringify({ status: 500, error: 'Failed to send message' }), { status: 500 });
    }
}