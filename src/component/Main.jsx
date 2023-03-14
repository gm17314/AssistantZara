import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Chats from "./Chats";
import { Configuration, OpenAIApi } from "openai";
import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { AuthContext } from "../context/AuthContext";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MessageBox = styled.div`
  width: 90%;
  height: 77%;
  overflow: auto;
  margin: 3rem;
  border:1px solid #201d3dbc;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(#29396968, #201d3d5e);
  box-shadow: 0 0 1rem .1rem #201d3d5e;
`;
const TextBox = styled.form`
  width: 89%;
  height: 5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 1rem;
  background-color: #fffefe;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 0.3rem 0.1rem #f8f4f4;
`;
const Textarea = styled.textarea`
  width: 95%;
  height: 100%;
  font-size: 2.2rem;
  line-height: 1;
  border: none;
  outline: none;
  padding: 0.8rem;
`;
const Send = styled.div`
  font-size: 2.2rem;
  cursor: pointer;
  color: rgb(22, 38, 83);
  rotate: -45deg;
  /* border: 1px solid red; */
  border-radius:40%;
  padding:0 .4rem;
  background-color: #201d3d1c;
  transition:all .5s;
  &:hover{

    transform: scale(1.1);
  }

`;
const Main = () => {
  const { currentUser } = useContext(AuthContext);

  const [input, setInput] = useState("hello");
  const [userChats, setUserChats] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const CollectionRef = collection(db, `MainDB/${currentUser.uid}/UserDB`);

  const getAnswer = async () => {
    if (input==="")setInput("hello");
    const obj = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      prompt:input,
    };
    const Time = Date.now();
    const DocRef = doc(db, `MainDB/${currentUser.uid}/UserDB/${Time}`)
    await setDoc(DocRef, {
      Input: input,
      Time: Time,
    });
    var element = document.getElementById("messagebox");
    element.scrollTop = element.scrollHeight;

    const response = await openai.createCompletion(obj);
    await updateDoc(DocRef, {
      Input: input,
      Output: response.data.choices[0].text,
      Time: Time,
    });
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    const unsub = onSnapshot(CollectionRef, (snapshot) => {
      setUserChats(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => (a.Time > b.Time ? 1 : -1))
      );
      
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <MessageBox id="messagebox">
        {userChats.map((chat) => (
          <>
            <Chats clas="activa" message={chat.Input} />
            {chat.Output && <Chats message={chat.Output} />}
          </>
        ))}
      </MessageBox>

      <TextBox>
        <Textarea onChange={(e) => setInput(e.target.value)} />
        <Send onClick={getAnswer}>➤</Send>
      </TextBox>
    </Container>
  );
};

export default Main;
