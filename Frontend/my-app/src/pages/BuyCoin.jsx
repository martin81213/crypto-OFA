import React from "react";
import styled from "styled-components"
import Navigation from "../components/navigation";
import TwdComparison from "../components/twdcomparison";

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

const BuyCoins = () => {
    return (
        <PageContaniner>
            <Navigation>
            </Navigation>
            <RightHalf>
                <Headers>
                    <span>BuyUSDT</span>
                </Headers>
                <TwdComparison></TwdComparison>
            </RightHalf>
        </PageContaniner>
    )
}

export default BuyCoins;