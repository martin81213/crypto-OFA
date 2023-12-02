import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    //width: 310px;
    height: 5vh;
    margin-left: 15%;
    color: #848E9c;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 8px; /* 設置圓角半徑，使其呈現圓角 */
    transition: color 0.3s, background-color 0.3s; /* 添加顏色過渡效果 */
    &:hover {
        color: white; /* 在 Hover 時更改文字顏色 */
    }
    
`
const BigContainer = styled.div`
&:hover {
    color: white; /* 在 Hover 時更改文字顏色 */
    background-color: gray; /* 在 Hover 時更改背景顏色 */
    border-radius: 8px; /* 設置圓角半徑，使其呈現圓角 */
}
`
const StyledLink = styled(Link)`
  color: inherit; /* 使用父元素的文字顏色 */
  text-decoration: none; /* 移除文字底線 */
  
  /* 你可以在這裡加入其他樣式 */
`;





const NavigationItem = (props) => {
    return (
        <StyledLink to={props.to}>
            <BigContainer>
                <Container>
                    {props.icon}
                    <span>{props.label}</span>
                </Container>
            </BigContainer>
        </StyledLink>
    )
}

export default NavigationItem;
