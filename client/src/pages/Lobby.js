import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React  from "react";
import { useHistory } from "react-router";
import CoolButton from "../components/CoolButton";
import Players from "../components/Players";
import InviteIcon from "../components/svg/InviteIcon";

const Lobby = ({ setInviteURL, inviteURL }) => {
  const toast = useToast();
  const history = useHistory();

  const onInvite = () => {
    navigator.clipboard.writeText(inviteURL);
    toast({
      title: "Invitation copied to clipboard!",
      description: `Send the invitation to your friends - ${inviteURL}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onStart = () => {
      history.push("/start");
  }


  return (
    <Flex direction="column" h="100%" alignItems="center" p="5">
      <Text m="4" fontSize="2xl" fontWeight="bold" color="secondary">
        Joueurs
      </Text>
      <Players />
      <Flex>
        <CoolButton onClick={onInvite} leftIcon={<InviteIcon />}>
          Inviter
        </CoolButton>
        <CoolButton onClick={onStart}/>
      </Flex>
    </Flex>
  );
};

export default Lobby;
