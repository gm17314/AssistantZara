import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 90%;
  height: 10rem;
  border-radius: 1rem;
  color: black;
  background-color: #e6dede;
  margin-top: 4rem;
  font-size: 3rem;
  font-family: "Gabriela";
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.8s;
  z-index: 1;

  &:hover {
    transition: all 0.8s;
    color: white;
  }

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: 50%;
    height: inherit;
    border-radius: inherit 0 0 inherit;
    left: -50%;
    background-color: white;
    transition: all 0.8s;
  }
  &:hover::before {
    left: 0%;
    background-color: #1f2d53;
    transition: all 0.8s;
  }

  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 50%;
    height: inherit;
    border-radius: inherit 0 0 inherit;
    transition: all 0.8s;
    right: -50%;
    background-color: white;
  }

  &:hover::after {
    right: 0%;
    background-color: #1f2d53;
    transition: all 0.8s;
  }
`;

const OptionCard = ({ content}) => {

  return <Card >{content}</Card>;
};

export default OptionCard;
