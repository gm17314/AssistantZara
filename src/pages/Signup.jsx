import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../FirebaseConfig";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: linear-gradient(to right,#43568fae,#322d5fe6); */
`;
const SignupBox = styled.div`
  width: 42rem;
  height: 47rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0.1rem #1d2436;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 2s;
`;
const SignUp = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 3.5rem;
  font-family: "Gabriela";
  text-align: center;
  color: white;
  margin: 2rem;
  cursor: pointer;
`;
const Input = styled.input`
  font-size: 2.5rem;
  font-family: "Poppins";
  width: 90%;
  padding: 0.5rem 1rem;
  margin: 1.5rem;
  color: #030350;
  background-color: white;
  border: 0.1rem solid black;
  border-radius: 1rem;
  outline: none;
`;
const Button = styled.button`
  font-size: 3rem;
  font-family: "Roboto Slab";
  padding: 0.1rem 0.5rem;
  margin: 1rem;
  border-radius: 1rem;
  border: 0.1rem solid #061641;
  color: #ffffffc1;
  background-color: #1e4074;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
`;

const LoginBox = styled.div`
  width: 42rem;
  height: 39rem;
  border: 0.1rem solid #001249;
  border-radius: 8rem 8rem 0 0;
  background-color: #162653;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transition: all 1s;
  bottom: -67%;
`;
const Login = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signup = () => {
  const navigate = useNavigate();

  const signupToLogin = () => {
    document.getElementById("login").style.bottom = "-67%";
    document.getElementById("signup").style.backgroundColor = "#1f2d53";
    document.getElementById("sign-heading").style.color = "white";
  };
  const loginToSignup = () => {
    document.getElementById("login").style.bottom = "0%";
    document.getElementById("signup").style.backgroundColor = "#f7f7f7";
    document.getElementById("sign-heading").style.color = "black";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      await updateProfile(user, { displayName: name });
      navigate("/");
      console.log(user);
      console.log(user.displayName);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("done");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Wrapper>
      <SignupBox id="signup">
        <Heading id="sign-heading" onClick={signupToLogin}>
          Signup
        </Heading>
        <SignUp onSubmit={handleSignup}>
          <Input placeholder="Enter username..." type="text" maxLength={11} />
          <Input placeholder="Enter email..." type="email" />
          <Input placeholder="Enter password..." type="text" />
          <Button>Submit</Button>
        </SignUp>

        <LoginBox id="login">
          <Heading onClick={loginToSignup}>Login</Heading>

          <Login onSubmit={handleLogin}>
            <Input placeholder="Enter email..." type="email" />
            <Input placeholder="Enter password..." type="text" />
            <Button>Submit</Button>
          </Login>
        </LoginBox>
      </SignupBox>
    </Wrapper>
  );
};

export default Signup;
