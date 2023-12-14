import { MetaMaskButton } from "@metamask/sdk-react-ui";
import React, { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
`

export const MetamaskLogin = () => {
  return (
    <div className="App">
      <MetaMaskButton theme={"dark"} color="black"></MetaMaskButton>
    </div>
  );
};