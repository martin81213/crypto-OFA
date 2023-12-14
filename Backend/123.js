import axios from "axios";
import fs from 'fs'

async function getAllFuturesPairs() {
    try {
        const response = await axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo');
        const exchangeInfo = response.data;

        if (exchangeInfo && exchangeInfo.symbols) {
            const futuresPairs = exchangeInfo.symbols
                .filter(symbol => symbol.contractType === 'PERPETUAL') // 選擇永續合約
                .map(symbol => `${symbol.symbol}:''`);

            // 將結果寫入文字檔
            fs.writeFileSync('futuresPairs.txt', futuresPairs.join('\n'), 'utf-8');

            console.log('All Futures Pairs:', futuresPairs);
            console.log('Results written to futuresPairs.txt');
            return futuresPairs;
        } else {
            console.error('Unable to retrieve exchange information.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// 調用函數
getAllFuturesPairs();
