import { Flex, Text } from '@chakra-ui/layout'
import React, { useContext, useState, useEffect } from 'react'
import GameContext from '../game-context'
import Avatar from './Avatar'

const Players = () => {
  const gameContext = useContext(GameContext)
  const [players, setPlayers] = useState([])
  useEffect(() => {
    setPlayers(gameContext?.players || [])
  }, [gameContext])
  return (
      <Flex p="5" m="2" align="center" direction="column" bg="rgba(80,24,81,.25)" w="50%" h="80%" overflowY="scroll">
        {players.length && players.map((player) => <Player key={player?.id} player={player}/>)}
      </Flex>
  )
}

const Player = ({player}) => {
  return (
    <Flex borderRadius="100px 25px 25px 100px" bg="white" direction="row" align="center" alignSelf="stretch" m="4" px="2" minW="50%">
      <Avatar m="2" size="md" name={player.name}/>
      <Text fontWeight="bold" fontSize="xl" color="rgb(48, 26, 107)">{player.name}</Text>
    </Flex>
  )
}

export default Players
