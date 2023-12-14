import React from "react";
import styled from 'styled-components';
import {Routes, Route ,Link} from "react-router-dom";


const Navigation = styled.nav`
margin-top:20px;
  display: flex;
  align-items: center;
  font-size: larger;
  margin-right:5%;
`;

const NavigationList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  
`;

const NavigationItem = styled.li`
  margin-right: 30px;
  //position: relative;

  &:not(:last-child)::after {
    content: "|";
    margin-left:15px;
    //position: relative;
    color: grey;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 15px;
  //letter-spacing: 20px;
  transition: color 0.2s;

  &:hover {
    color: #DAA520;
  }
`;

const Category = () => {
    return (
        <Navigation>
            <NavigationList>
                <NavigationItem><StyledLink to="/news">News</StyledLink></NavigationItem>
                <NavigationItem><StyledLink to="/job">Jobs</StyledLink></NavigationItem>
                <NavigationItem><StyledLink to="/indicators">RS&indicators</StyledLink></NavigationItem>
                <NavigationItem><StyledLink to="/buycoins">BuyUSDT</StyledLink></NavigationItem>
            </NavigationList>
        </Navigation>
    )
}

export default Category;