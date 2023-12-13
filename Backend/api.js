import express from 'express';
import axios from "axios";
import * as dotenv from 'dotenv';
import { start } from 'repl';
import mysql from "mysql2";
import cors from 'cors';
import { WebhookClient } from 'discord.js'
import cron from 'node-cron'
import TechnicalIndicators from 'technicalindicators'
import NodeCache from 'node-cache';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const cache = new NodeCache();


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

app.use('/.well-known/pki-validation/', (req, res) => {
    res.sendFile(path.join(__dirname, 'DA941A1D57DE9C48796A4E482080933D (1).txt'));
})


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

        // 存到DB
        // 在存儲新數據之前清空表格
        const clearTableQuery = 'TRUNCATE strongcoin';
        dbPool.query(clearTableQuery, (clearError, clearResults, clearFields) => {
            if (clearError) {
                console.error('清空表格時發生錯誤:', clearError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('表格已清空');

            // 將 finalData 存儲到 MySQL 數據庫
            for (const symbol of finalData) {
                // 使用 MySQL 連接池執行 INSERT 語句
                const insertQuery = 'INSERT INTO strongcoin (symbol) VALUES (?)';
                const insertValues = [symbol];

                dbPool.query(insertQuery, insertValues, (insertError, insertResults, insertFields) => {
                    if (insertError) {
                        console.error(`存儲 ${symbol} 到數據庫時發生錯誤:`, insertError);
                    } else {
                        console.log(`${symbol} 存儲成功`);
                    }
                });
            }

            // ... 其他代碼
        });

        res.json(finalData);
        // res.json(results);
    } catch (error) {
        console.error('發生錯誤:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 拿強勢幣
app.get('/api/1.0/getStrongCoin', async (req, res) => {

    dbPool.query(`SELECT * FROM strongcoin`, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
})

// 拿工作
app.get('/api/1.0/getJobs', async (req, res) => {
    const cacheKey = 'jobsData';

    // Check if data is in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log("Sending cached data");
        return res.json({ data: cachedData });
    }

    console.log("Fetching data from the database");

    let temp = [];

    // 104 人力銀行
    dbPool.query(`SELECT * FROM jobs`, (error, results1) => {
        if (error) {
            console.log(error);
        } else {
            temp.push(results1);

            // Second query
            dbPool.query(`SELECT * FROM cakeJobs`, (error, results2) => {
                if (error) {
                    console.log(error);
                } else {
                    temp.push(results2);

                    // Cache the data for future requests
                    cache.set(cacheKey, temp, 600);

                    // Send the combined result back to the frontend
                    res.json({ data: temp });
                }
            });
        }
    });
});

// 工作搜索
app.get('/api/1.0/search104', async (req, res) => {
    console.log(req.query);
    console.log("Search 104");
    const keyword = req.query.query;
    console.log(keyword);
    let temp = [];
    // 開始query
    dbPool.query(`SELECT * FROM jobs where job_title LIKE "%${keyword}"`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'search error' });
        } else {
            console.log(results);
            //temp.push(results);
            res.json({ data: results });
        }
    })
})

// CakeResume的搜尋功能
app.get('/api/1.0/searchCake', async (req, res) => {
    console.log(req.query);
    console.log("Search Cake");
    const keyword = req.query.query;
    console.log(keyword);
    let temp = [];
    // 開始query
    dbPool.query(`SELECT * FROM cakeJobs where job_title LIKE "%${keyword}"`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'search error' });
        } else {
            console.log(results);
            //temp.push(results);
            res.json({ data: results });
        }
    })
})

app.get('/api/1.0/getNews', async (req, res) => {
    console.log('getNews');

    // 定義緩存鍵（唯一識別符）
    const cacheKey = 'getNews';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log("從緩存中發送資料");
        // 如果有快取資料，直接發送快取的資料
        return res.json({ data: cachedData });
    }
    console.log("從資料庫中取得新聞資料");

    // 如果沒有快取資料，進行資料庫查詢
    dbPool.query(`SELECT * FROM news`, (error, results) => {
        let temp = []
        if (error) {
            console.log(error);
            res.status(500).json({ message: '取得新聞資料錯誤' });
        } else {
            temp.push(results)
            // 將查詢結果存入快取
            cache.set(cacheKey, temp, 600);
            // 發送資料給前端
            res.json({ data: temp });
        }
    });
});






// 最便宜的幣價
app.get('/api/1.0/getUsdtPrice', async (req, res) => {
    console.log("TWD!!!")
    try {
        const response = await fetch('https://usdtwhere.com/wallet-api/v1/kgi/exchange-rates/comparison/', {
            method: 'GET',
            mode: 'no-cors',
        });
        if (!response.ok) {
            console.error('Network response was not ok. Status:', response.status);
            throw new Error('Network response was not ok');
        }
        const data2 = await response.json();
        console.log(data2.data.exchanges);
        const exchangeList = data2.data.exchanges;
        for (let i = 0; i < exchangeList.length; i++) {
            if (exchangeList[i].name === "MAX") {
                exchangeList[i].url = "https://max.maicoin.com/?lang=zh-TW"
            } else if (exchangeList[i].name === "BITO") {
                exchangeList[i].url = "https://www.bitopro.com/ns/home"
            } else if (exchangeList[i].name === "TWBank") {
                exchangeList[i].url = "https://www.bot.com.tw/tw/personal-banking"
            } else if (exchangeList[i].name === "Rybit") {
                exchangeList[i].url = "https://www.rybit.com/zh-TW/"
            } else if (exchangeList[i].name === "ACE") {
                exchangeList[i].url = "https://ace.io/"
            }
        }
        res.send(data2.data.exchanges)


        // return data2;
    } catch (error) {
        console.error('Error fetching data2:', error);
        throw error;
    }
})

// bitgin 
app.get('/api/1.0/getBitgin', async (req, res) => {
    console.log("Bitgon")
    try {
        const response = await fetch('https://api.bitgin.net/v1/exchange/markets?market=USDTTWD', {
            method: 'GET',
            mode: 'no-cors',
        });
        if (!response.ok) {
            console.error('Network response was not ok. Status:', response.status);
            throw new Error('Network response was not ok');
        }
        const data2 = await response.json();
        console.log(data2)
        //console.log(data2.data[0].bid)
        let responseData = {}

        responseData.name = 'Bitgin';
        responseData.buy_rate = data2.data[0].bid;
        responseData.sell_rate = data2.data[0].ask;
        responseData.url = "https://www.bitgin.net/";
        responseData.update_time = new Date().getTime();
        console.log(responseData.update_time);
        res.json(({ responseData }))

        // return data2;
    } catch (error) {
        console.error('Error fetching data2:', error);
        res.send({
            "responseData": {
                "name": "Bitgin",
                "buy_rate": "??",
                "sell_rate": "??",
                "url": "https://www.bitgin.net/",
                "update_time": 1702200212056
            }
        });
        //throw error;
    }
})


// 52.63.5.206 排程
cron.schedule('59 7 * * *', async () => {
    try {
        // 执行您的 API 逻辑，直接发起 HTTP 请求到 API 端点
        const response = await axios.get('http://52.63.5.206:5000/api/1.0/RS_signal');
        const responseData = response.data;

        console.log('API 任务已执行', responseData);
    } catch (error) {
        console.error('API 任务发生错误:', error.message);
        DiscordWebHookClient.send({
            content: "排程出問題了，请检查"
        })
    }
}, { timezone: "Asia/Taipei" });

///////////////////////////////////////////////////////

// app.use(bodyParser.json());

// 計算移動平均 
function calculateMA(prices, period) {
    const maValues = [];

    for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) {
            maValues.push(null);
        } else {
            const sum = prices.slice(i - period + 1, i + 1).reduce((acc, price) => acc + price.close, 0);
            const average = sum / period;
            maValues.push(average);
        }
    }

    return maValues;
}

/////////////////////// MACD ////////////////////////////
function calculateMovingAverage(prices, period) {
    const maValues = [];
    //console.log("prices: ",prices)

    for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) {
            maValues.push(null);
        } else {
            const sum = prices.slice(i - period + 1, i + 1).reduce((acc, price) => acc + price, 0);
            const average = sum / period;
            maValues.push(average);
        }
    }

    return maValues;
}
function calculateMACD(data, shortTerm, longTerm, signal) {
    const shortMA = calculateMA(data, shortTerm);
    const longMA = calculateMA(data, longTerm);
    console.log("data:  ", data)
    console.log("shortMA: ", shortMA);
    console.log("LongMa: ", longMA)

    const dif = shortMA.map((value, index) => value - longMA[index]);
    const dea = calculateMovingAverage(dif, signal);
    const macd = dif.map((value, index) => value - dea[index]);

    return { dif, dea, macd };
}


function determineTrend(dif, dea, macd) {
    const latestDif = dif[dif.length - 1];
    const latestDea = dea[dea.length - 1];
    const latestMacd = macd[macd.length - 1];

    if (latestDif > latestDea && latestMacd > 0) {
        return ("long")
    } else if (latestDif < latestDea && latestMacd < 0) {
        return ("short")
    } else {
        return ("middle")
    }
}
/////////////////////////////////////////////////////////////////////

function calculateRSI(data, period = 14) {
    const rsiValues = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            rsiValues.push(null);
        } else {
            // 計算價格變化
            const priceChanges = Array.from({ length: period }, (_, j) => data[i - j].close - data[i - j - 1].close);

            // 分別計算正數價格變化和負數價格變化的平均值
            const averageGain = priceChanges.filter(change => change > 0).reduce((acc, gain) => acc + gain, 0) / period;
            const averageLoss = -priceChanges.filter(change => change < 0).reduce((acc, loss) => acc + loss, 0) / period;

            // 計算相對強弱指標（RSI）
            const relativeStrength = averageGain / averageLoss;
            const rsi = 100 - (100 / (1 + relativeStrength));

            rsiValues.push(rsi);
        }
    }

    return rsiValues;
}


/////////////////////////////////////////////////////////////////////
// KD 指標計算函數
function calculateKD(data, period = 14) {
    const kValues = [];
    const dValues = [];

    for (let i = period - 1; i < data.length; i++) {
        const highestHigh = Math.max(...data.slice(i - period + 1, i + 1).map(item => item.high));
        const lowestLow = Math.min(...data.slice(i - period + 1, i + 1).map(item => item.low));

        const currentClose = data[i].close;
        const rsv = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;

        // 計算 K 值
        const k = i === period - 1 ? rsv : (kValues[i - period] * (period - 1) + rsv) / period;
        kValues.push(k);

        // 計算 D 值
        const d = i === period - 1 ? k : (dValues[i - period] * (period - 1) + k) / period;
        dValues.push(d);
    }

    return { k: kValues, d: dValues };
}
/////////////////////////////////////////////////////////
// DMI 指標計算函數
function calculateDMI(data, period = 14) {
    const trueRanges = [];
    const positiveDMs = [];
    const negativeDMs = [];

    for (let i = 1; i < data.length; i++) {
        const high = data[i].high;
        const low = data[i].low;
        const prevHigh = data[i - 1].high;
        const prevLow = data[i - 1].low;

        const trueHigh = Math.max(high - prevHigh, 0);
        const trueLow = Math.max(prevLow - low, 0);

        const trueRange = Math.max(high - low, Math.abs(high - data[i - 1].close), Math.abs(low - data[i - 1].close));
        trueRanges.push(trueRange);

        // Positive Directional Movement
        const positiveDM = high - prevHigh > prevLow - low ? Math.max(high - prevHigh, 0) : 0;
        positiveDMs.push(positiveDM);

        // Negative Directional Movement
        const negativeDM = prevLow - low > high - prevHigh ? Math.max(prevLow - low, 0) : 0;
        negativeDMs.push(negativeDM);
    }

    const averageTrueRange = calculateAverage1(trueRanges.slice(0, period));
    const averagePositiveDM = calculateAverage1(positiveDMs.slice(0, period));
    const averageNegativeDM = calculateAverage1(negativeDMs.slice(0, period));

    const positiveDI = (averagePositiveDM / averageTrueRange) * 100;
    const negativeDI = (averageNegativeDM / averageTrueRange) * 100;

    const DX = Math.abs((positiveDI - negativeDI) / (positiveDI + negativeDI)) * 100;

    const ADX = calculateAverage1([...Array(period - 1).fill(0), DX], period);

    return { positiveDI, negativeDI, ADX };
}

// 平均值計算函數
function calculateAverage1(arr, period) {
    const sum = arr.slice(0, period).reduce((acc, value) => acc + value, 0);
    return sum / arr.slice(0, period).length;
}
////////////////////////////////////////


// Trend OFA
app.post('/api/1.0/getMA', async (req, res) => {
    try {
        console.log(req.body)
        const symbol = req.body.currency;
        console.log(symbol)
        const interval = req.body.timezone;
        console.log(interval)

        let indicatorResults = {};

        const historicalPrices = await axios.get(`https://api.binance.com/api/v3/klines`, {
            params: {
                symbol: symbol.toUpperCase(),
                interval: interval,
                limit: 60, // 請求最近60條價格數據
            },
        });
        //console.log("歷史資料: ", historicalPrices)

        // 計算MA30
        const ma30 = calculateMA(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })), 30);

        // 計算MA45
        const ma45 = calculateMA(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })), 45);

        // 計算MA60
        const ma60 = calculateMA(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })), 60);
        console.log(ma30, ma45, ma60)

        if (ma30 > ma45 && ma45 > ma60) {
            indicatorResults.ma = "Bullish";
        } else if (ma30 < ma45 && ma45 < ma60) {
            indicatorResults.ma = "Bearish";
        } else {
            indicatorResults.ma = "Neutral";
        }

        // 計算 MACD  
        const { dif, dea, macd } = calculateMACD(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })), 12, 26, 9);

        console.log("DIF:", dif);
        console.log("DEA:", dea);
        console.log("MACD:", macd);

        const MACDresults = determineTrend(dif, dea, macd)
        if (MACDresults === "long") {
            indicatorResults.macd = "Bullish";
        } else if (MACDresults === "short") {
            indicatorResults.macd = "Bearish";
        } else if (MACDresults === "middle") {
            indicatorResults.macd = "Neutral";
        }

        console.log(indicatorResults)

        // 計算RSI
        console.log(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })))
        const rsiValues = calculateRSI(historicalPrices.data.map(item => ({ close: parseFloat(item[4]) })));

        console.log('RSI values:', rsiValues);
        const length = rsiValues.length;
        indicatorResults.rsi = rsiValues[length - 1]


        ////////////////////////////////////////////////
        // 現在你可以在你的代碼中使用這個函數
        // 使用 ADX 指標計算函數
        // 使用 historicalPrices.data 填充 priceData
        const priceData = historicalPrices.data.map(item => ({
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
        }));

        // 計算 ADX
        const adxResult = TechnicalIndicators.ADX.calculate({ period: 14, close: priceData.map(item => item.close), high: priceData.map(item => item.high), low: priceData.map(item => item.low) });
        const adxValues = adxResult.map(item => item.adx);
        const adx_length = adxValues.length - 1
        const adxJudge = adxValues[adx_length - 1]
        indicatorResults.adx = adxJudge;

        console.log('ADX Values:', adxValues);
        ///////////////////////////////////////////////////
        // 使用 KD 指標計算函數
        const kdValues = calculateKD(historicalPrices.data.map(item => ({
            high: parseFloat(item[2]), // High prices
            low: parseFloat(item[3]),  // Low prices
            close: parseFloat(item[4]), // Close prices
        })));

        // console.log('K values:', kdValues.k);
        // console.log('D values:', kdValues.d);

        // 判斷 KD 信號
        const lastK = kdValues.k[kdValues.k.length - 1];
        const lastD = kdValues.d[kdValues.d.length - 1];

        let kdSignal;
        if (lastK > lastD) {
            kdSignal = 'Bullish'; // 多頭信號
        } else if (lastK < lastD) {
            kdSignal = 'Bearish'; // 空頭信號
        } else {
            kdSignal = 'Neutral'; // 無明顯趨勢
        }

        console.log('KD Signal:', kdSignal);
        indicatorResults.kd = kdSignal;
        /////////////////////////////////////////////

        // 使用 DMI 指標計算函數
        const dmiValues = calculateDMI(historicalPrices.data.map(item => ({
            high: parseFloat(item[2]), // High prices
            low: parseFloat(item[3]),  // Low prices
            close: parseFloat(item[4]), // Close prices
        })));


        // 判斷 DMI 信號
        let dmiSignal;
        if (dmiValues.positiveDI > dmiValues.negativeDI && dmiValues.ADX > 25) {
            dmiSignal = 'Bullish';
        } else if (dmiValues.positiveDI < dmiValues.negativeDI && dmiValues.ADX > 25) {
            dmiSignal = 'Bearish';
        } else {
            dmiSignal = 'Neutral';
        }

        console.log('DMI Signal:', dmiSignal);
        indicatorResults.dmi = dmiSignal;
        /////////////////////////////////////////

        console.log(indicatorResults)

        res.send({ "data": indicatorResults })



    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




app.listen(5000, () => {
    console.log('Listening to Port 5000...');
});
