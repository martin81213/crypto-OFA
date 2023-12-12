import React from "react";
import { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Search = styled.div`
  border: 2px solid #ccc;
  padding: 10px; /* 增加上下内边距 */
  border-radius: 20px; /* 添加圆角边框 */
  width: 214px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none; /* 移除邊框 */
  outline: none;
  margin-right: 42px;
  padding: 0; /* 移除內邊距 */
  background: transparent; /* 設置背景為透明 */
  color: inherit; /* 保留文字顏色 */
  font-size: inherit; /* 保留文字大小 */

  &:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;
const LinkIcon = styled.div`
  width: 44px;
  height: 44px;
  position: absolute;
  right: 0;
`;

const SearchIcon = styled.img`
cursor:pointer;
&:hover {
    content: url("./search-hover.png"); /* 更换另一张图片 */
  }
`

const SearchCakeComponent = ({ setCakeJobData }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        try {
            console.log("Performing Cakesearch...");
            console.log(searchTerm);
    
            const response = await fetch(`http://localhost:5000/api/1.0/searchCake?query=${searchTerm}`);
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            console.log(data.data);
    
            setCakeJobData(data.data);
            console.log("setJobData called successfully");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Search>
            <SearchInput
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <LinkIcon>
                <SearchIcon onClick={handleSearch} src="/search.png" />
            </LinkIcon>
        </Search>
    );
};

export default SearchCakeComponent;