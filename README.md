# Crypto OFA
整合各大資訊 --> 工作 + 新聞 + 指標&高波動幣種 + 哪裡買USDT最便宜

## 網址
https://ec2-52-63-5-206.ap-southeast-2.compute.amazonaws.com/

## How to start?
* #### Frontend :
```
npm install
cd Frontend/my-app
npm start
```
* #### Backend :
```
npm install
node api.js
```
## Main Feature
* #### 最新的幣圈新聞
        透過爬蟲取得相關的新聞, 提供最新的資訊
* #### 104 & CakeResume 最新的區塊鏈相關工作+搜尋功能
        透過爬蟲整合104, CakeResume每天最新的區塊鏈工作
* #### 6種指標+RS 篩選出強勢加密貨幣, 節省你挑標的的時間
        MA+ADX+DMI+MACD+RSI+KD 再加上每天用RS強弱比較挑出前30名的幣
* #### 一鍵查詢最便宜的台幣兌USDT價格
        隨時可以知道在哪裡用台幣買USDT最便宜
## Demo
* #### News in action
![image](https://github.com/martin81213/crypto_OFA/blob/main/news%20(1).gif)
* #### Jobs in action
![image](https://github.com/martin81213/crypto_OFA/blob/main/jobs%20(1).gif)
* #### RS & indicators in action
![image](https://github.com/martin81213/crypto_OFA/blob/main/indicators%20(1).gif)
* #### BuyUSDT in action
![image](https://github.com/martin81213/crypto_OFA/blob/main/BuyUSDT%20(1).gif)  

## Technologies
* #### Frontend :
    * React, React-Router
    * Styled-components
    * Material-UI
    * React-icon
    * React-Query
    * fetch
* #### Backend :
    * Nodejs
    * express
    * mysql
    * nginx
    * crontab
    * axios
    * webhook
    * fetch
      
## Architecture
  ![image](https://github.com/martin81213/crypto_OFA/assets/88333551/51229a92-26c1-4488-b1ce-8cccdea30367)
## Data Schema
```e=
Table 1: cakejobs
- Column 1: job_title (var)
- Column 2: company_title (var)
- Column 3: job_tags (var)
- Column 4: addition_information (var)
- Column 5: job_url (var)

Table 2: jobs
- Column 1: date (var)
- Column 2: job_title (var)
- Column 3: company_title (var)
- Column 4: industries (var)
- Column 5: addition_information (var)
- Column 6: salary (var)
- Column 7: job_tags (var)
- Column 8: job_url (var)

Table 3: news
- Column 1: time (var)
- Column 2: title (var)
- Column 3: tags (var)
- Column 4: url (var)
- Column 5: img (var)

Table 4: strongcoin
- Column 1: symbol (var)
```
## Contact
* #### Email : dadalai1327@gmail.com
