import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBuilding } from "react-icons/fa";
import SearchComponent from "./search";
import SearchCakeComponent from "./searchCake";
import { MdOutlineWork } from "react-icons/md";

const Container = styled.div`
    width:47%;
    display: flex;
    color: white;
    flex-direction: column;
    max-height: 80vh; /* 設定框框的最大高度 */
    overflow-y: auto; /* 超過高度時顯示滾輪 */
    //border: 1px solid #ccc; /* 添加邊框 */
    border-radius: 8px; /* 可選，添加圓角效果 */
    padding: 16px; /* 可選，添加內邊距 */
    // background-color : black;
    background-color: rgb(44 45 60 / 97%);

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

const NewsContent = styled.div`
    display: flex;
    margin-bottom : 8px;
    align-items:center
`

const LinkContainer = styled.a`

    text-decoration: none;
    color: inherit;
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-top:1.5%;
    margin-bottom : 1.5%;

    &:hover {
        color: yellow; /* 在 Hover 時更改文字顏色 */
        background-color : grey;
        border-radius: 8px; /* 可選，添加圓角效果 */
    }
`

const Title = styled.img`
    height:45px;
`

const TitleForCake = styled.img`
    height:45px;
`
/* 104 CSS*/
const Date = styled.div`
    width : 10%;
    //color:grey;
`
const JobTitle = styled.div`
    width : 30%;
    margin-right:20px;
`
const CompanyTitle = styled.div`
    width : 35%;
`
const JobTags = styled.div`
    width : 20%
`

/* Cake CSS*/
const CakeJobTitle = styled.div`
    width : 35%;
    margin-right:5%
`

const CakeCompanyTitle = styled.div`
    width : 25%;
    margin-right:5%
`

const CakeJobTags = styled.div`
    width : 30%
`

const JobInfoItem = styled.div`
    display : flex;
    margin-top : 5px;

`

const Divider = styled.div`
border-bottom: 1px solid #ccc; /* 分隔線樣式 */
`

const AllContainer = styled.div`
    display:flex;
    justify-content:space-around;
`

const TitleContainer = styled.div`
display : flex;
justify-content:space-between;
margin-bottom:20px;

`


const Jobs = () => {
    const [jobData, setJobData] = useState([])
    const [cakeJobData, setCakeJobData] = useState([])

    console.log("123")
    console.log(jobData);

    useEffect(() => {
        //fetch("http://localhost:5000/api/1.0/getJobs")
        fetch("http://52.63.5.206:5000/api/1.0/getJobs")
            .then((response) => response.json())
            .then((data) => {
                setJobData(data.data[0])
                setCakeJobData(data.data[1]);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching jobs data:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Job data updated:", jobData);
    }, [jobData]);

    useEffect(() => {
        console.log("Job data updated:", jobData);
    }, [cakeJobData]);

    return (
        <AllContainer>
            <Container>
                <TitleContainer>
                    <Title src="./jobLogo/104.png"></Title>
                    <SearchComponent setJobData={setJobData}></SearchComponent>
                </TitleContainer>
                <Divider></Divider>
                {jobData && jobData.length > 0 && jobData.map((news, index) => (
                    <Divider>
                        <LinkContainer key={index} href={news.job_url.startsWith('https://') ? news.job_url : `https://${news.job_url}`} target="_blank">
                            <NewsContent>
                                <Date>{news.date}</Date>
                                <JobTitle>{news.job_title}</JobTitle>
                                <CompanyTitle><FaBuilding color="#3081D0"></FaBuilding> {news.company_title}</CompanyTitle>
                                <JobTags>
                                    {news.job_tags.split(', ').map((tag, tagIndex) => (
                                        <JobInfoItem>🔸{tag}</JobInfoItem>
                                    ))}
                                </JobTags>
                            </NewsContent>
                        </LinkContainer>
                    </Divider>
                ))}
            </Container>
            <Container>
                <TitleContainer>
                    <TitleForCake src="./jobLogo/cake.png"></TitleForCake>
                    <SearchCakeComponent setCakeJobData={setCakeJobData}></SearchCakeComponent>
                </TitleContainer>
                <Divider></Divider>
                {cakeJobData && cakeJobData.length > 0 && cakeJobData.map((news, index) => (
                    <Divider>
                        <LinkContainer key={index} href={news.job_url.startsWith('https://www.cakeresume.com') ? news.job_url : `https://www.cakeresume.com${news.job_url}`} target="_blank">
                            <NewsContent>
                                <CakeJobTitle>{news.job_title}</CakeJobTitle>
                                <CakeCompanyTitle><FaBuilding color="#3081D0"></FaBuilding> {news.company_title}</CakeCompanyTitle>
                                <CakeJobTags>
                                    {news.job_tags.split(', ').map((tag, tagIndex) => (
                                        <JobInfoItem>🔸{tag}</JobInfoItem>
                                    ))}
                                </CakeJobTags>
                            </NewsContent>
                        </LinkContainer>
                    </Divider>
                ))}
            </Container>
        </AllContainer>

    );
}

export default Jobs;
