import React from "react";
import styled from "styled-components"
import Navigation from "../components/navigation";
import DailyNews from "../components/dailynews";

const PageContaniner = styled.div`
    display:flex
`

const RightHalf = styled.div`
display : flex;
flex-direction : column;
//background-color: rgb(44 45 60 / 97%);
background-color: #ccc;
width: -webkit-fill-available;
//justify-content: center;
`

const News = () => {
    return (
        <PageContaniner>
            <Navigation>
            </Navigation>
            <RightHalf>
                <DailyNews></DailyNews>
            </RightHalf>
        </PageContaniner>
    )
}

export default News;