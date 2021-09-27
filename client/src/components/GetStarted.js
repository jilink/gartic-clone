import { Flex, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import SocketContext from "../socket-context";
import Avatar from "./Avatar";
import CoolButton from "./CoolButton";
import CoolInput from "./CoolInput";

const GetStarted = ({ id }) => {
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);
  const history = useHistory();
  const createGame = () => {
    if (name) {
      console.log("ici");
      socket.emit("createGame", name);
      history.push("/lobby");
    }
  };
  const joinGame = () => {
    if (name) {
      socket.emit("joinGame", {id: id, name: name});
      console.log("ici join");
      history.push("/lobby");
    }
  };
  return (
    <Flex p="5" align="center" direction="column" bg="rgba(80,24,81,.25)">
      <Text fontWeight="bold" fontSize="2xl">
        Choisis un pseudo
      </Text>
      <Avatar name={name} />
      <CoolInput
        isInvalid={!name}
        setValue={setName}
        placeholder="pseudoTropCool"
      />
      {id ? 
      <CoolButton onClick={joinGame}> rejoindre une partie</CoolButton> 
      :
      <CoolButton onClick={createGame} /> }
    </Flex>
  );
};


export default GetStarted;
