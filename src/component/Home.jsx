import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
// import OptionCard from "./OptionCard";
import Main from "./Main";

const Homepage = styled.div`
  width: 100%;
  height: 95vh;
  background-color: inherit;
  display: flex;
`;
// const Left = styled.div`
//   width: 23%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border-right: 0.1rem solid #1f2d53;
// `;
const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: rgb(244, 245, 245); */
`;

const Home = () => {
  // const { currentOption } = useContext(CurrOptionContext);
  return (
    <>
      <Navbar />
      <Homepage>
        {/* <Left>
        <OptionCard id="qna" content="Ques & Ans" />
          <OptionCard id="chatwithai" content="Chat With AI" />
          <OptionCard id="translator" content="Translator" />
          <OptionCard id="grammarcorrection" content="Correct Grammer" />
        </Left> */}
        <Right>
          <Main/>
        </Right>
      </Homepage>
    </>
  );
};

export default Home;
