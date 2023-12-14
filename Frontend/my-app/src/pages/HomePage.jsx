import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Category from "../components/category";
import Carousel from "../components/carousel";
import { IconContext } from "react-icons";
import { BiNews } from 'react-icons/bi';
import { GiMuscleFat } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { MetamaskLogin } from "../components/metamaskbutton";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  background-color: #1a1a1a; /* 暗色背景 */
  color: #ffffff; /* 文字顏色 */
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const EnterButton = styled(Link)`
position : absolute;
top:62%;
left:51%;

text-decoration: none; /* 移除底線 */
  padding: 15px 70px;
  font-size: 25px;
  background-color: #00cc66; /* 綠色按鈕 */
  color: #ffffff; /* 按鈕文字顏色 */
  border: white 5px solid;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00994d; /* 滑鼠懸停時的顏色 */
  }
`;

const Header = styled.div`
width:100%;
  display:flex;
  background-color:black;
  justify-content:space-between;

`
const Logo = styled.img`
margin-left:1%;
width:14%;

`
const BannerContainer = styled.div`
  position:relative;
`
const Banner = styled.img`
`
const ContentContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-bottom : 5%;
`

const OfaContainer = styled.div`
display:flex;
justify-content: space-between;
width:79%;

`

const ContentBox = styled(Link)`
text-decoration:none;
width:20%;
padding-left: 24px;
padding-right: 24px;
padding-top: 24px;
padding-bottom: 24px;
background-color: #1E2329;
color:inherit;
`

const IntroduceTitle = styled.div`
width:100%;
display : flex;
align-items:center;
//justify-content: space-between;
`
const Title2 = styled.div`
margin-left:20%;
font-size :20px;

`

const OFApicture = styled.img`
width: -webkit-fill-available;
margin-top:20px;
`

const OFAspan = styled.div`
  margin-top:10px;
`

const HomePage = () => {
  const handleEnterClick = () => {
    // 處理進入按鈕點擊事件
    console.log("Entering the Crypto World!");
  };

  return (
    <HomePageContainer>
      <Header>
        <Logo src="./logo2.png"></Logo>
        <Category></Category>
        <MetaMaskButton></MetaMaskButton>
      </Header>
      <ContentContainer>
        <BannerContainer>
          <Banner src="goodbtc.png"></Banner>
          <EnterButton to="/news" onClick={handleEnterClick}>
            Enter OFA
          </EnterButton>
        </BannerContainer>
        <OfaContainer>
          <ContentBox to="/news">
            <IntroduceTitle>
              <IconContext.Provider value={{ color: '#F0B90B', size:'20px' }}>
                <BiNews></BiNews>
              </IconContext.Provider>
              <Title2>
                News
              </Title2>
            </IntroduceTitle>
            <OFApicture src="./ofaIntroduce/news.png"></OFApicture>
            <OFAspan>OFA lets you know the latest news.<br></br><br></br> Update Every hours</OFAspan>
          </ContentBox>
          <ContentBox to="/job">
            <IntroduceTitle>
              <IconContext.Provider value={{ color: '#F0B90B', size:'20px' }}>
                <FaBriefcase></FaBriefcase>
              </IconContext.Provider>
              <Title2>
                Jobs
              </Title2>
            </IntroduceTitle>
            <OFApicture src="./ofaIntroduce/jobs.png"></OFApicture>
            <OFAspan>OFA lets you know the latest Jobs.</OFAspan>
          </ContentBox>
          <ContentBox to="/indicators">
            <IntroduceTitle>
              <IconContext.Provider value={{ color: '#F0B90B', size:'20px' }}>
                <GiMuscleFat></GiMuscleFat>
              </IconContext.Provider>
              <Title2>
                RS & Indicators
              </Title2>
            </IntroduceTitle>
            <OFApicture src="./ofaIntroduce/indicators.png"></OFApicture>
            <OFAspan>OFA selects strong coins, and providing multiple indicators to assist with market analysis.</OFAspan>
          </ContentBox>
          <ContentBox to="/buycoins">
            <IntroduceTitle>
              <IconContext.Provider value={{ color: '#F0B90B', size:'20px' }}>
                <CiShop></CiShop>
              </IconContext.Provider>
              <Title2>
                BuyUSDT
              </Title2>
            </IntroduceTitle>
            <OFApicture src="./ofaIntroduce/shop.png"></OFApicture>
            <OFAspan>OFA informs you where to purchase USDT at the most cost-effective rates.</OFAspan>
          </ContentBox>
        </OfaContainer>
      </ContentContainer>

      <Carousel></Carousel>

    </HomePageContainer>
  );
};

export default HomePage;
