import React, { useState } from "react";
import styled from "styled-components";
import CustomizedSelects from "./material/select";
import ButtonUsage from "./material/button";
import Example from "./material/needle"; // 儀錶板
import StrongList from "./strong";

const PageContainer = styled.div`
    // display : flex;
    // flex-direction:column
`

const Headers = styled.div`
    background-color: #0B0E11;
    height:7vh;
    display:flex;
    color:white;
    align-items:center;
    justify-content:center;
    color:grey;
    font-size : 30px;

`

const IndicatorContainer = styled.div`
position: relative;
width:50%;
background-color:grey;
border-radius: 10px;
margin-top:15px;
margin-left:15px;

`

const SubmitContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Add this line */
    
`;

const InputContainer = styled.div`
    
    
`

const ButtonContainer = styled.div`
    display: flex;
    position: absolute;
    top : 45%;
    left : 80%;
`;

const ExampleContainer = styled.div`
margin-top:5%;
    display:flex;
    //width:70%;
`

const ChartContainer = styled.div`
    //position:relative;
    justify-content:center;
    display:flex;
    flex-direction:column;
    color:white;
    font-size : 30px;
`

const ChartName = styled.div`
    //position:absolute;
    
`
const Content = styled.div`
    display:flex;
`

const Left = styled.div`
    width:50%;
    margin-left:5%;
    margin-top : 0.5%
`
const Right = styled.div`
color:white;
margin-right:5%;
margin-left:15%;
width:30%;

`


function Indicators() {
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [ma, setMa] = useState(0);
    const [macd, setMacd] = useState(0);
    const [rsi, setRsi] = useState(0);
    const [adx, setAdx] = useState(0);
    const [kd, setKd] = useState(0);
    const [dmi, setDmi] = useState(0);

    const handleButtonClick = () => {
        console.log("123131223")
        // 將選擇的幣種和時區等資訊轉為 JSON 格式
        const requestData = {
            currency: selectedCurrency,
            timezone: selectedTimezone,
            // 其他需要傳送的資訊
        };

        console.log("requestedData: ", requestData)

        // 使用 fetch 或其他 HTTP 客戶端庫來呼叫 API
        fetch("http://localhost:5000/api/1.0/getMA", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                // 處理 API 回應
                console.log("API 回應:", data);

                // ma
                if (data.data.ma === "Bullish") {
                    setMa(85);
                } else if (data.data.ma === "Neutral") {
                    setMa(50);
                } else {
                    setMa(25);
                }

                //adx
                setAdx(data.data.adx)

                //dmi
                if (data.data.dmi === "Bullish") {
                    setDmi(85);
                } else if (data.data.dmi === "Neutral") {
                    setDmi(50);
                } else {
                    setDmi(25);
                }

                // macd
                if (data.data.macd === "Bullish") {
                    setMacd(85);
                } else if (data.data.macd === "Neutral") {
                    setMacd(50);
                } else {
                    setMacd(25);
                }

                //rsi
                setRsi(data.data.rsi)

                //kd
                if (data.data.kd === "Bullish") {
                    setKd(85);
                } else if (data.data.kd === "Neutral") {
                    setKd(50);
                } else {
                    setKd(25);
                }
            })
            .catch((error) => {
                console.error("API 錯誤:", error);
            });
    };

    return (
        <PageContainer>
            <Headers>
                <span>RS & Indicators</span>
            </Headers>
            <Content>
                <Left>
                    <IndicatorContainer>
                        <SubmitContainer>
                            <InputContainer>
                                <CustomizedSelects
                                    onSelectChange={(currency) => setSelectedCurrency(currency)}
                                    onTimezoneChange={(timezone) => setSelectedTimezone(timezone)}
                                />
                            </InputContainer>
                            <ButtonContainer>
                                <div>
                                    <ButtonUsage onClick={handleButtonClick} />
                                </div>
                            </ButtonContainer>
                        </SubmitContainer>
                    </IndicatorContainer>
                    <ExampleContainer>
                        <ChartContainer>
                            <ChartName>MA</ChartName>
                            <Example needleValue={ma} />
                        </ChartContainer>
                        <ChartContainer>
                            <ChartName>ADX</ChartName>
                            <Example needleValue={adx} />
                        </ChartContainer>
                        <ChartContainer>
                            <ChartName>DMI</ChartName>
                            <Example needleValue={dmi} />
                        </ChartContainer>
                    </ExampleContainer>
                    <ExampleContainer>
                        <ChartContainer>
                            <ChartName>MACD</ChartName>
                            <Example needleValue={macd} />
                        </ChartContainer>
                        <ChartContainer>
                            <ChartName>RSI</ChartName>
                            <Example needleValue={rsi} />
                        </ChartContainer>
                        <ChartContainer>
                            <ChartName>KD</ChartName>
                            <Example needleValue={kd} />
                        </ChartContainer>
                    </ExampleContainer>
                </Left>
                <Right>
                    <StrongList></StrongList>
                </Right>
            </Content>
        </PageContainer>
    );
}

export default Indicators;
