import { Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import CoolButton from "../components/CoolButton";
import LoadedCanvas from "../components/LoadedCanvas";
import GameContext from "../game-context";

const Reveal = () => {
  const gameContext = useContext(GameContext)
  const [threads, setThreads] = useState([])
  const [currentThread, setCurrentThread] = useState(0)

  useEffect(() => {
    const tmpThreads = Object.values(gameContext?.game?.threads);
    setThreads(tmpThreads)
  }, [gameContext])

  return (
    <Flex
      direction="column"
      h="100%"
      alignItems="center"
      p="5"
      justify="center"
    >
      <Flex
        flex="1"
        m="2"
        p="5"
        direction="column"
        bg="rgba(80,24,81,.25)"
        minW="80%"
        minH="80%"
        alignItems="center"
        justify="center"
      >
        {threads ? <Thread thread={threads[currentThread]}/> : null }

        <Next setCurrentThread={setCurrentThread} currentThread={currentThread}/>

      </Flex>
    </Flex>
  );
};

export const Thread = ({ thread }) => {
  const [entry, setEntry] = useState({});
  useEffect(() => {
    const updateEntry = () => {
      thread.shift();
      setEntry(thread?.[0]);
    };
    setEntry(thread?.[0]);
    if (thread?.length > 1) {
      setTimeout(updateEntry, 5000);
    }
  }, [thread]);

  return (
    <div>
      <Text>THREAD</Text>
      {thread?.length ? <Entry entry={entry} /> : null}
    </div>
  );
};

export const Entry = ({ entry }) => {
  return (
    <>
      <Avatar m="2" size="md" name={entry?.playerName} />
      <Text fontWeight="bold" fontSize="xl" color="rgb(48, 26, 107)">
        {entry?.playerName}
      </Text>
      {entry?.type === "draw" ? (
        <LoadedCanvas savedDrawing={entry.data} />
      ) : (
        <Text>{entry?.data}</Text>
      )}
    </>
  );
};

export const Next = ({ setCurrentThread, currentThread }) => {
  return (
    <CoolButton
      onClick={() => {
        setCurrentThread(currentThread + 1);
      }}
    >
      Next thread
    </CoolButton>
  );
};

export default Reveal;
