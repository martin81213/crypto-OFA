import React from "react";
import styled from "styled-components";
import NavigationItem from "./navigationItem";
import { Link } from "react-router-dom";
import { BiNews } from 'react-icons/bi';
import { GiMuscleFat } from "react-icons/gi";
import { FaBriefcase } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    // align-items:center;
    width : 240px;
    height:100vh;
    background-color : rgb(24, 26, 32);
`

const iconsArray = [
    { icon: <BiNews />, label: 'News', to: '/news'  },
    { icon: <FaBriefcase />, label: 'Job' , to: '/job'},
    { icon: <GiMuscleFat />, label: 'StrongCoin' , to: '/strongcoin' },
    { icon: <CiShop />, label: 'BuyCoin', to: '/buycoin'  },
];
const Logo = styled.img`
    display:flex;

`

const Navigation = () => {
    return (
        <Container>
            <Logo src="./Binance-Logo.wine.png"></Logo>
            {iconsArray.map((item) => (
                <NavigationItem key={item.label} label={item.label} icon = {item.icon} to={item.to}/>
            ))}
        </Container>
    )
}

export default Navigation
