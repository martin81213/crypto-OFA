import express from 'express';
import axios from "axios";
import * as dotenv from 'dotenv';
import { start } from 'repl';
import mysql from "mysql2";
import cors from 'cors';
import { WebhookClient } from 'discord.js'
import cron from 'node-cron'


dotenv.config();

const app = express();
const apiKey = process.env.BINANCE_API_KEY;
const secretKey = process.env.BINANCE_PASSWORD;
const DiscordWebHookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK
})
app.use(cors())

// MySQL 連接設定
const dbPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 使用中間件解析 JSON
app.use(express.json());


// RS相對強弱
app.get('/api/1.0/RS_signal', async (req, res) => {
    try {
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/exchangeInfo`);
        const exchangeInfo = response.data;
        let allSymbols = exchangeInfo.symbols.map(symbolInfo => symbolInfo.symbol);
        console.log(allSymbols);
        // allSymbols = ["1000LUNCUSDT"]

        const interval = '1d';

        const results = [];

        // 取得台北時區的開始時間
        const taipeiTimeZone = 'Asia/Taipei';
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0); // 設定時間為午夜 00:00:00
        startTime.setDate(startTime.getDate() - 7); // 減去七天
        const taipeiStartTime = startTime.toLocaleString('en-US', { timeZone: taipeiTimeZone });

        // 取得台北時區的結束時間
        const endTime = new Date();
        const taipeiEndTime = endTime.toLocaleString('en-US', { timeZone: taipeiTimeZone });


        //const startTime = new Date('2023-11-25T00:00:00Z');  // 調整為每日的開始時間
        //const endTime = new Date('2023-12-02T00:00:00Z');    // 調整為結束日期的次日的開始時間

        for (const symbol of allSymbols) {
            try {

                console.log("開始時間:", startTime);
                console.log("結束時間:", endTime);

                const klinesResponse = await axios.get(`https://fapi.binance.com/fapi/v1/klines`, {
                    params: {
                        symbol: symbol,
                        interval: interval,
                        startTime: startTime,
                        endTime: endTime,
                        limit: 7,
                    },
                    headers: {
                        'X-MBX-APIKEY': apiKey,
                    },
                });

                console.log(startTime);
                console.log(endTime);

                const klines = klinesResponse.data;
                let temp = [];
                console.log(symbol)

                klines.forEach(kline => {
                    const openPrice = kline[1];
                    const closePrice = kline[4];
                    const performance = (closePrice - openPrice) / openPrice;
                    console.log(`收現時間: ${new Date(kline[6])}, 收盤價: ${closePrice}`);
                    //console.log(performance)
                    temp.push(performance);
                });

                if (temp.length < 7) {
                    continue;
                }

                let RS = 0

                RS = RS + temp[0] * 5 + temp[1] * 8 + temp[2] * 11 + temp[2] * 14 + temp[3] * 17 + temp[4] * 20 + temp[5] * 23 + temp[6] * 26
                RS = RS / 124

                console.log("RS: ", RS)

                results.push({
                    symbol: symbol,
                    RS值: RS,
                });
            } catch (error) {
                console.error(`獲取${symbol}的K線數據時發生錯誤:`, error.response ? error.response.data : error.message);
            }
        }

        results.sort((a, b) => b.RS值 - a.RS值);

        let finalData = []

        for (let i = 0; i < 30; i++) {
            finalData.push(results[i].symbol)
            finalData[i] = finalData[i].replace("USDT", "")
        }

        console.log(finalData)

        // res.json(finalData);

        // 發到Line 
        const accessToken = process.env.LINE_TOKEN;

        await axios.post(
            'https://notify-api.line.me/api/notify',
            `message=\n+${finalData.join('\n')}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 月份是从 0 到 11
        const day = currentDate.getDate();


        const messageContent = `
        🗓 ${year}-${month}-${day}  RS 標的篩選\n🔸強勢標的：${finalData.slice(0, 10).join(' , ')}\n🔸次強勢標的 ： ${finalData.slice(10, 20).join(' , ')}\n🔸可關注標的 : ${finalData.slice(20, 30).join(' , ')}
        `;


        // Discord 通知功能
        DiscordWebHookClient.send({
            content: messageContent
        })


        res.json(finalData);
        // res.json(results);
    } catch (error) {
        console.error('發生錯誤:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 52.63.5.206
cron.schedule('59 7 * * *', async () => {
    try {
        // 执行您的 API 逻辑，直接发起 HTTP 请求到 API 端点
        const response = await axios.get('http://52.63.5.206/api/1.0/RS_signal');
        const responseData = response.data;

        console.log('API 任务已执行', responseData);
    } catch (error) {
        console.error('API 任务发生错误:', error.message);
        DiscordWebHookClient.send({
            content: "排程出問題了，请检查"
        })
    }
}, { timezone: "Asia/Taipei" });

app.get('/api/1.0/getJobs', async (req, res) => {

    console.log("getJobs")
    let temp = [];

    // 104 人力銀行
    dbPool.query(`SELECT * FROM jobs`, (error, results1) => {
        if (error) {
            console.log(error);
        } else {
            temp.push(results1);

            // 第二個查詢
            dbPool.query(`SELECT * FROM cakeJobs`, (error, results2) => {
                if (error) {
                    console.log(error);
                } else {
                    temp.push(results2);

                    // 將合併後的結果發送回前端
                    res.json({ data: temp });
                }
            });
        }
    });
});

app.get('/api/1.0/getNews', async (req, res) => {
    console.log("getNews")
    let temp = [];

    dbPool.query(`SELECT * FROM news`, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            temp.push(results);
            res.json({ data: temp });
        }
    })
})


app.listen(5000, () => {
    console.log('Listening to Port 5000...');
});
