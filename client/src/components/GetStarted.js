import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import Avatar from "./Avatar";
import CoolButton from "./CoolButton";
import CoolInput from "./CoolInput";
import PlayIcon from "./svg/PlayIcon";

const GetStarted = () => {
  const [name, setName] = useState("")
  return (
    <Flex p="5" align="center" direction="column" bg="rgba(80,24,81,.25)">
          <Text fontWeight="bold" fontSize="2xl">
            Choisis un pseudo
          </Text>
      <Avatar name={name}/>
          <CoolInput isInvalid={!name} setValue={setName} placeholder="pseudoTropCool" />
          <CoolButton/>
    </Flex>
  );
};


export default GetStarted;
