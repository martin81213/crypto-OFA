import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const Container2 = styled.div`
    display: flex;
    color: white;
    flex-wrap: wrap;
    //flex-direction: column;
    max-height: 57vh; /* 設定框框的最大高度 */
    overflow-y: auto; /* 超過高度時顯示滾輪 */
    //border: 1px solid #ccc; /* 添加邊框 */
    border-radius: 8px; /* 可選，添加圓角效果 */
    //padding: 8px; /* 可選，添加內邊距 */
    //background-color : #EAE0D5;

    /* 自定義滾動條樣式 */
    &::-webkit-scrollbar {
        width: 6px; /* 設定滾動條寬度 */
        opacity: 0; /* 初始時透明 */
        transition: opacity 0.5s ease; /* 添加過渡效果 */
    }

    &:hover::-webkit-scrollbar-thumb {
        background-color: grey;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px; /* 可選，添加圓角效果 */
    }

    &::-webkit-scrollbar-track {
        //background-color: #ccc; /* 設定滾動條軌道的顏色 */
        border-radius: 8px; /* 可選，添加圓角效果 */
    }
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    margin-top : 2%
`
const LinkContainer = styled.a`
    height : 280px;
    text-decoration: none;
    color: inherit;
    display:flex;
    flex-direction:column;
    //justify-content:center;
    margin-top:1.5%;
    margin-bottom : 1.5%;
    align-items : center;

    // &:hover {
    //     color: yellow; /* 在 Hover 時更改文字顏色 */
    //     background-color : grey;
    //     border-radius: 8px; /* 可選，添加圓角效果 */
    // }
`
const ThreeImage = styled.img`
width:309.5px;
height:222px;
object-fit:cover;
border-radius:5px;
`
const MainImageItem = styled.div`
    width : 30%;
    display: flex;
    justify-content:center;
    color:#C6AC8F;
    flex-direction : column;
    position: relative; /* 设置为相对定位 */

`;

const TopContainer = styled.div`
    display: flex;
    width: 85%;
    justify-content: space-around;
    z-index: 1; /* 設定 z-index 使得 TopContainer 在堆疊順序上在上方 */
`;

const NewsTitle = styled.div`

`

const NewsTitleContainer = styled.div`
    width: 50%;
    border-top: 4px solid #4b3aed;
    border-radius: 2px;
    background: #fff;
    font-weight: 600;
    line-height: 1.2;
    color: #29273b;
    padding: 16px 14px;
    text-align: center; /* 居中对齐 */
    flex-grow: 1;
    font-family: "Noto Serif TC","Noto Serif SC";
    position: absolute; /* 设置为绝对定位 */
    bottom: 0;
    font-size:16px;

    &:hover {
        color: red; /* 在 Hover 時更改文字顏色 */
    }
`;

const Banner = styled.div`
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('./Snipaste_2023-12-03_22-33-51.png');
    background-size: cover;
    color: white;
    font-size: 24px;
`;
const Banner2 = styled.div`
background-image: url(../wave-bg.png);
background-repeat: repeat;
width: -webkit-fill-available;
height: 350px;
position: absolute;
border-radius:8px;
`;

const TitleDate = styled.div`
font-family: Roboto;
font-size: 10px;
font-weight: 700;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color : grey;
`

const TitleTags = styled.div`
border-radius: 20px;
background-color: #e0e0e0;
font-family: Roboto;
font-size: 16px;
font-weight: 500;
line-height: 1;
letter-spacing: .2px;
text-align: center;
color: #4f4f4f;
padding: 3px 8px;
display: inline-block;
margin-bottom: 3px;
text-decoration: none;
white-space: nowrap;
margin-right:5px;

`

const Ttitle = styled.div`
display:flex;
align-items:center;
`

const LittleContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items : center;
`

const OtherNews = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top : 50px;
`

const LinkContainer2 = styled.a`
    text-decoration: none;
    color: black;
    display:flex;
    flex-direction:column;
    //justify-content:center;
    margin-top:1.5%;
    margin-bottom : 1.5%;
    //align-items : center;
`

const MainImageItem2 = styled.div`
    width:33%;
    display: flex;
    justify-content:center;
    color:#C6AC8F;
    flex-direction : column;
    position: relative; /* 设置为相对定位 */

`;

const Container_fundingRate = styled.div`
`
const OtherInformation = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom : 10px;
`
const OtherNewsTitle = styled.div`
    font-size:17px;
    margin-top : 18px;
    width:60%;
    //font-family: "Noto Serif TC","Noto Serif SC";
    color:white;
    &:hover {
        color: red; /* 在 Hover 時更改文字顏色 */
    }
`
const DateContainer = styled.div`
    display:flex;
    width:60%;
    justify-content: flex-end;
    
`
const OtherNewsDate = styled.div`
    font-family: Roboto;
    font-size: 10px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color : grey;
    font-size:12px;
`
const OtherNewsImg = styled.img`
    width:70%;
    height : 196px;
    border-radius : 8px;
    object-fit: cover

`

const Ttitle2=styled.div`
display:flex;
width:60%;
margin-top : 5px;
`

const DailyNews = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        //fetch("http://localhost:5000/api/1.0/getNews")
        fetch("http://52.63.5.206:3000/api/1.0/getNews")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setNews(data.data)
            }).catch((error) => {
                console.error("Error fetching news data:", error);
            });
    }, []);

    // 获取前三条新闻
    const topThreeNews = news[0] && news[0].length > 0 ? news[0].slice(0, 3) : [];
    const fromThirdNewsToEnd = news[0] && news[0].length > 3 ? news[0].slice(3) : [];

    return (
        <div>
            {/* <Banner></Banner> */}
            <Banner2></Banner2>
            <Container>
                <TopContainer>
                    {topThreeNews.map((singleNews, index) => (
                        <MainImageItem>
                            <LinkContainer key={index} href={singleNews.url.startsWith('https://') ? singleNews.url : `https://${singleNews.url}`} target="_blank">
                                <ThreeImage src={singleNews.img}></ThreeImage>
                                <NewsTitleContainer>
                                    <LittleContainer>
                                        <Ttitle>
                                            {singleNews.tags.split(' ').map((tag, tagIndex) => (
                                                <TitleTags>{tag}</TitleTags>
                                            ))}
                                        </Ttitle>
                                        <TitleDate>{singleNews.time}</TitleDate>
                                    </LittleContainer>
                                    <NewsTitle>
                                        {singleNews.title}
                                    </NewsTitle>
                                </NewsTitleContainer>
                            </LinkContainer>
                        </MainImageItem>
                    ))}
                </TopContainer>
            </Container>
            <OtherNews>
                <Container2>
                    {fromThirdNewsToEnd.map((news, index) => (
                        <MainImageItem2>
                            <LinkContainer2 key={index} href={news.url.startsWith('https://') ? news.url : `https://${news.url}`} target="_blank">
                                <OtherInformation>
                                    <OtherNewsImg src={news.img}></OtherNewsImg>
                                    <OtherNewsTitle>{news.title}</OtherNewsTitle>
                                    <Ttitle2>
                                        {news.tags.split(' ').map((tag, tagIndex) => (
                                            <TitleTags>{tag}</TitleTags>
                                        ))}
                                    </Ttitle2>
                                    <DateContainer>
                                        <OtherNewsDate>{news.time}</OtherNewsDate>
                                    </DateContainer>
                                </OtherInformation>
                            </LinkContainer2>
                        </MainImageItem2>
                    ))}
                </Container2>
                {/* <TwdComparison></TwdComparison> */}
            </OtherNews>

        </div>
    )
}

export default DailyNews;