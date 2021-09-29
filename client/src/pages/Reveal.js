import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Avatar from "../components/Avatar";
import CoolButton from "../components/CoolButton";
import LoadedCanvas from "../components/LoadedCanvas";
import GameContext from "../game-context";

const Reveal = () => {
  const gameContext = useContext(GameContext)
  const [threads, setThreads] = useState([])
  const [nextDisabled, setNextDisabled] = useState(true)
  const [currentThread, setCurrentThread] = useState(0)
  const [totalThreadNumber, setTotalThreadNumber] = useState(0)

  useEffect(() => {
    const tmpThreads = Object.values(gameContext?.game?.threads);
    setThreads(tmpThreads)
    setTotalThreadNumber(tmpThreads.length)
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
<Spacer/>
        {threads ? <Thread setNextDisabled={setNextDisabled} currentThread={currentThread} thread={threads[currentThread]}/> : null }

<Spacer/>
        <Next setNextDisabled={setNextDisabled} disabled={nextDisabled} setCurrentThread={setCurrentThread} currentThread={currentThread} totalThreadNumber={totalThreadNumber}/>

      </Flex>
    </Flex>
  );
};

export const Thread = ({setNextDisabled, currentThread, thread }) => {
  const [entry, setEntry] = useState({});
  useEffect(() => {
    const updateEntry = () => {
      thread.shift();
      setEntry(thread?.[0]);
      if (thread?.length > 1) {
        setTimeout(updateEntry, 5000);
      } else {
        setNextDisabled(false)
      }
    };
    setEntry(thread?.[0]);
    if (thread?.length > 1) {
      setTimeout(updateEntry, 5000);
    }
  }, [thread]);

  return (
    <>
      <Text top={0} position='absolute' fontWeight='bold' fontSize='4xl'>THREAD {currentThread + 1}</Text>
      {thread?.length ? <Entry entry={entry} /> : null}
    </>
  );
};

export const Entry = ({ entry }) => {
  return (
    <>
      <Box position="absolute" top={10}>
        <Flex
          borderRadius="50px 50px 50px 50px"
          bg="white"
          direction="row"
          align="center"
          alignSelf="stretch"
          m="4"
          px="2"
          minW="50%"
        >
          <Avatar size="2xl" m="2" size="md" name={entry?.playerName} />
          <Text
            alignSelf="center"
            fontWeight="bold"
            fontSize="2xl"
            color="rgb(48, 26, 107)"
          >
            {entry?.playerName}
          </Text>
        </Flex>
      </Box>
      {entry?.type === "draw" ? (
        <LoadedCanvas savedDrawing={entry.data} />
      ) : (
        <Text>{entry?.data}</Text>
      )}
    </>
  );
};

export const Next = ({
  totalThreadNumber,
  setNextDisabled,
  setCurrentThread,
  currentThread,
  ...props
}) => {
  const [lastThread, setLastThread] = useState(false);
  const history = useHistory();
  return (
    <>
      {lastThread ? (
        <CoolButton
          onClick={() => {
            history.push("/");
          }}
          {...props}
        >
          Back home
        </CoolButton>
      ) : (
        <CoolButton
          onClick={() => {
            const current = currentThread + 1;
            if (current + 1 === totalThreadNumber) {
              setLastThread(true);
            }
            setCurrentThread(current);
            setNextDisabled(true);
          }}
          {...props}
        >
          Next thread
        </CoolButton>
      )}
    </>
  );
};

export default Reveal;
