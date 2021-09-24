import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import CoolButton from "../components/CoolButton";
import Players from "../components/Players";
import InviteIcon from "../components/svg/InviteIcon";

const Lobby = () => {
  return (
    <Flex direction="column" h="100%" alignItems="center" p="5">
      <Text m="4" fontSize="2xl" fontWeight="bold" color="secondary">
        Joueurs 1/10
      </Text>
      <Players />
      <Flex>
        <CoolButton leftIcon={<InviteIcon />}>Inviter</CoolButton>
        <CoolButton />
      </Flex>
    </Flex>
  );
};

export default Lobby;
