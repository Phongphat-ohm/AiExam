import axios, { AxiosRequestConfig } from "axios";
import { data } from "framer-motion/client";


export async function POST(req: Request) {
    const body = await req.json();

    const data = {
        "content": null,
        "embeds": [{
            "title": "แจ้งเตือนมีการ Commit code มาที่ Repository",
            "description": "รายละเอียด",
            "color": 36863,
            "fields": [{
                "name": "ชื่อ Commit",
                "value": body.head_commit.message
            },
            {
                "name": "ผู้ Commit",
                "value": body.sender.login
            }],
            "author": {
                "name": "Github", "url": "https://github.com",
                "icon_url": "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            },
            "footer": {
                "text": "Commit มาเมื่อ"
            },
            "timestamp": body.repository.pushed_at,
            "thumbnail": {
                "url": body.sender.avatar_url
            }
        }],
        "attachments": []
    };

    axios.post("https://discordapp.com/api/webhooks/1322946031360413726/BmFfWEwoliGkQhGD4ROtkeWi_yD9zwNQxdS-xtO4jGpuNWfLBc6itz0mjJiPX_Qpi55A", data);

    return Response.json({ status: 200 });
}