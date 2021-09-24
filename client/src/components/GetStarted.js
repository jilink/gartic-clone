import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import CoolInput from "./CoolInput";

const GetStarted = () => {
  return (
    <Flex p="5" direction="column" bg="rgba(80,24,81,.25)">
      <Flex>
        <p>image</p>
        <Flex direction="column">
          <Text>Choisis un pseudo</Text>
          <CoolInput placeholder="pseudoTropCool"/>
          <Button w="fit-content" leftIcon={<PlayIcon/>} bg="white" color="#301A6B" fontFamily="revert" textTransform='uppercase' fontWeight='bold' boxShadow='0px 6px 0px 0px #301a6b'>
            Démarrer
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

const PlayIcon = () => {
  return <Image h='3vh' src="https://garticphone.com/images/ic_play.svg"/>
}

export default GetStarted;
