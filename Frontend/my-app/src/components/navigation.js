import React from "react";
import styled from "styled-components";
import NavigationItem from "./navigationItem";
import { Link } from "react-router-dom";
import { BiNews } from 'react-icons/bi';
import { GiMuscleFat } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { MetamaskLogin } from "./metamaskbutton";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    // align-items:center;
    width : 240px;
    min-height:100vh;
    background-color : rgb(24, 26, 32);
`

const iconsArray = [
    { icon: <BiNews />, label: 'News', to: '/news' },
    { icon: <FaBriefcase />, label: 'Jobs', to: '/job' },
    { icon: <GiMuscleFat />, label: 'RS & Indicators', to: '/indicators' },
    { icon: <CiShop />, label: 'BuyUSDT', to: '/buycoins' },
];
const Logo = styled.img`
    display:flex;
    margin-top:3%;
    margin-bottom: 20%;;
    width:100%;

`



const Navigation = () => {
    return (
        <Container>
            <Link to="/">
                <Logo src="./logo.png"></Logo>
            </Link>
            {iconsArray.map((item) => (
                <NavigationItem key={item.label} label={item.label} icon={item.icon} to={item.to} />
            ))}
            <MetamaskLogin></MetamaskLogin>
        </Container>
    )
}

export default Navigation
