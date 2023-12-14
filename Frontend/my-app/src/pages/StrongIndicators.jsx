import React from "react";
import styled from "styled-components";
import Navigation from "../components/navigation";
import Indicators from "../components/indicator";

const PageContaniner = styled.div`
    display:flex;
    height:100vh;
    overflow:hidden;
`

const RightHalf = styled.div`
display : flex;
flex-direction : column;
background-color: rgb(44 45 60 / 97%);
//background-color: #181A20;
width: -webkit-fill-available;
//height : 100vh;
//justify-content: center;
`

const StrongIndicators = () => {
    return (
        <PageContaniner>
            <Navigation>
            </Navigation>
            <RightHalf>
                <Indicators></Indicators>
            </RightHalf>
        </PageContaniner>
    )
}

export default StrongIndicators;