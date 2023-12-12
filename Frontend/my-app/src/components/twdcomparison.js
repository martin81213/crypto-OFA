import React from "react";
import styled from "styled-components";
import { useQuery } from 'react-query';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  height:44%;
`;

const ExchangeBox = styled.a`

  color:black;
  text-decoration:none;
  flex: 1 0 calc(30% - 20px);
  height: 100%;
  //border: 1px solid black;
  margin-top: 5px;
  margin-bottom : 8px;
  margin-left:10px;
  margin-right:10px;
  //padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.backgroundimage});
    background-size: cover;
    background-position: center;
    opacity: 0.05; // 默认透明度
    z-index: 0; // 将伪元素放置在正常文档流的下层
    transition: opacity 0.3s ease; // 添加渐变效果
    border-radius: 50px;
  }

  &:hover::before {
    opacity: 1; // 鼠标悬停时的透明度
    z-index: 1;
  }
`;

const OtherIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  z-index: 1;
`;

const ExchangeName = styled.h2`
  font-size: 40px;
  margin-bottom: 8px;
  //z-index: 1; // 将文字内容放置在正常文档流的上层
`;

const ExchangeRates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  //z-index: 1; // 将文字内容放置在正常文档流的上层
`;

const ExchangeContentBox = styled.div`
  //z-index:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:100%;

`

const Rate = styled.div`
  font-size:30px;
  margin-bottom: 10px;
`;

const UpdateTime = styled.p`
  font-size:20px ;
  color: #777;
`;

const CrownIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  //z-index:1;
`;

const bitgin = async () => {
  //const response = await fetch('http://localhost:5000/api/1.0/getBitgin')
  const response = await fetch('http://52.63.5.206:5000/api/1.0/getBitgin')
  const data = await response.json();
  console.log(data);
  return data;
}

const markets = async () => {
  //const response = await fetch('http://localhost:5000/api/1.0/getUsdtPrice/')
  const response = await fetch('http://52.63.5.206:5000/api/1.0/getUsdtPrice/')
  const data2 = await response.json();
  console.log('交易所Data: ', data2);
  return data2;
}

const TwdComparison = () => {
  const { data, isLoading, isError } = useQuery('TWDtoUsdt', markets);
  const { data: bitginData, isLoading: bitginLoading, isError: bitginError } = useQuery('Bitgin', bitgin);

  if (isLoading || bitginLoading) {
    return <p>Loading</p>;
  }

  if (isError || bitginError) {
    return <p>Error Fetching Data</p>;
  }

  // 根据数据排序，找到最便宜的一家
  const sortedData = [...data].sort((a, b) => a.buy_rate - b.buy_rate);
  const cheapestExchange = sortedData[0];

  return (
    <Container>
      {sortedData.map((exchange, index) => (
        <ExchangeBox key={index} href={exchange.url} backgroundimage={`./${exchange.name}.png`}>
          <ExchangeContentBox>
            {exchange === cheapestExchange && <CrownIcon src="./crown.png" alt="Crown" />}
            {exchange !== cheapestExchange && <OtherIcon />}
            <ExchangeName>{exchange.name}</ExchangeName>
            <ExchangeRates>
              <Rate>買價: {exchange.buy_rate}</Rate>
              <Rate>賣價: {exchange.sell_rate}</Rate>
            </ExchangeRates>
            <UpdateTime>Last updated: {new Date(Number(exchange.update_time)).toLocaleString()}</UpdateTime>
          </ExchangeContentBox>
        </ExchangeBox>
      ))}
      {/* Bitgin */}
      <ExchangeBox backgroundimage="./bitgin.png">
        <ExchangeContentBox>
          {bitginData.responseData === cheapestExchange && <CrownIcon src="./crown.png" alt="Crown" />}
          {bitginData.responseData !== cheapestExchange && <OtherIcon />}
          <ExchangeName>{bitginData.responseData.name}</ExchangeName>
          <ExchangeRates>
            <Rate>買價 : {bitginData.responseData.buy_rate}</Rate>
            <Rate>賣價 : {bitginData.responseData.sell_rate}</Rate>
          </ExchangeRates>
          <UpdateTime>Last updated: {new Date(Number(bitginData.responseData.update_time)).toLocaleString()}</UpdateTime>
        </ExchangeContentBox>
      </ExchangeBox>
    </Container>
  );
};

export default TwdComparison;
