import React from "react";
import styled from "styled-components"
import Navigation from "../components/navigation";
import Jobs from "../components/jobs";

const PageContaniner = styled.div`
    display:flex
`
const RightHalf = styled.div`
display : flex;
flex-direction : column;
background-color: rgb(44 45 60 / 97%);
width: -webkit-fill-available;
//justify-content: center;
`
const JobsContainer = styled.div`
display:flex;
width: -webkit-fill-available;
justify-content: space-around;
margin-top:3%;

`
const TopInformation = styled.div`
    display:flex;
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


const Job = () => {
    return (
        <PageContaniner>
            <Navigation>
            </Navigation>
            <RightHalf>
            <Headers>
                <span>Jobs</span>
            </Headers>
                <JobsContainer>
                    <TopInformation>
                        <Jobs></Jobs>
                    </TopInformation>
                </JobsContainer>
            </RightHalf>
        </PageContaniner>
    )
}

export default Job;