import { Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SocketContext from "../socket-context";
import Avatar from "./Avatar";
import CoolButton from "./CoolButton";
import CoolInput from "./CoolInput";

const GetStarted = () => {
  const [name, setName] = useState("")
  const socket = useContext(SocketContext)
  const createGame = () => {
    socket.emit("createGame");
    socket.emit("joinGame", 'trcucuc');
  }
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
      <Link to="/lobby">
        <CoolButton onClick={createGame} />
      </Link>
    </Flex>
  );
};


export default GetStarted;
