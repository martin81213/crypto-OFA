import React, { useState } from "react";
import styled from "styled-components";
import NavigationItem from "./navigationItem";
import { BiNews } from 'react-icons/bi';
import { GiMuscleFat } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { MetamaskLogin } from "./metamaskbutton";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 240px;
    min-height: 100vh;
    background-color: rgb(24, 26, 32);
`

const iconsArray = [
    { icon: <BiNews />, label: 'News', to: '/news' },
    { icon: <FaBriefcase />, label: 'Jobs', to: '/job' },
    { icon: <GiMuscleFat />, label: 'RS & Indicators', to: '/indicators' },
    { icon: <CiShop />, label: 'BuyUSDT', to: '/buycoins' },
];

const Logo = styled.img`
    display: flex;
    margin-top: 3%;
    margin-bottom: 20%;
    width: 100%;
`


const BottomContainer = styled.div`
margin-top:auto;
margin-bottom:30px;
`

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDiscordIconClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Container>
            <Link to="/">
                <Logo src="./logo.png" alt="Logo" />
            </Link>
            {iconsArray.map((item) => (
                <NavigationItem key={item.label} label={item.label} icon={item.icon} to={item.to} />
            ))}
            <BottomContainer>
                <MetamaskLogin />
            </BottomContainer>
        </Container>
    );
};

export default Navigation;
