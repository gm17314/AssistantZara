import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  &.activa {
    justify-content: flex-end;
  }
`;
const Chat = styled.div`
  max-width: 80%;
  overflow-x: hidden;
  font-size: 2rem;
  border-radius: 0.7rem 0.2rem 0.7rem 0.2rem;
  background-color: #1f2d53;
  color: white;
  /* background-color: rgb(31 45 83 / 25%);*/
  padding: 0.6rem 1rem;
  margin: 1rem;
  &.activa {
    /* background-color: rgb(51 67 112 / 3%); */
    background-color: #e6dede;
    color:black;
  }
`;

const Chats = ({ message, clas }) => {
  return (
    <Container className={clas}>
      <Chat className={clas}>{message}</Chat>
    </Container>
  );
};

export default Chats;
