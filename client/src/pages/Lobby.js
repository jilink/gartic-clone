import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useContext, useEffect, useState }  from "react";
import { useHistory } from "react-router";
import CoolButton from "../components/CoolButton";
import Players from "../components/Players";
import InviteIcon from "../components/svg/InviteIcon";
import GameContext from "../game-context";
import SocketContext from "../socket-context";

const Lobby = ({ setInviteURL, inviteURL }) => {
  const toast = useToast();
  const history = useHistory();
  const socket = useContext(SocketContext);
  const gameContext = useContext(GameContext)

  const [players, setPlayers] = useState([])
  useEffect(() => {
    setPlayers(gameContext?.players || [])
    if (socket) {
    socket.on("gameStart", (data) => {
      history.push("/start");
    });
    }
  }, [socket, gameContext, history]);

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
      if (!players.length){
         history.push("/");
         return;
      }
      socket.emit("startGame");
  }


  return (
    <Flex direction="column" h="100%" alignItems="center" p="5">
      <Text m="4" fontSize="2xl" fontWeight="bold" color="secondary">
        Joueurs
      </Text>
      <Players players={players}/>
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
