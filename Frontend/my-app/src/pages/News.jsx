import React from "react";
import styled from "styled-components"
import Navigation from "../components/navigation";
import DailyNews from "../components/dailynews";
// import { MetaMaskButton } from "@metamask/sdk-react-ui";

const PageContaniner = styled.div`
    display:flex
`

const RightHalf = styled.div`
display : flex;
flex-direction : column;
//background-color: rgb(44 45 60 / 97%);
background-color: rgb(44 45 60 / 97%);
width: -webkit-fill-available;
//justify-content: center;
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

const News = () => {
    return (
        <PageContaniner>
            <Navigation>
            </Navigation>
            <RightHalf>
                <Headers>
                    <span>News</span>
                </Headers>
                
                <DailyNews></DailyNews>
            </RightHalf>
        </PageContaniner>
    )
}

export default News;