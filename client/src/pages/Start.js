import { Box, Flex, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import React, { useContext, useEffect, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import CoolButton from '../components/CoolButton';
import CoolInput from '../components/CoolInput';
import ReadyIcon from '../components/svg/ReadyIcon';
import SocketContext from '../socket-context';


const Start = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [savedDrawing, setSavedDrawing] = useState(null);
  const socket = useContext(SocketContext);
  const [turn, setTurn] = useState({})
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    if (socket) {
    socket.on("turnStart", (data) => {
      console.log("data", data);
      setTurn(JSON.parse(data));
      setDisabled(false)
    });
  }
  }, [socket])
  return (
    <Flex
      direction="column"
      h="100%"
      alignItems="center"
      p="5"
      justify="center"
    >
      <Text>
        {turn?.currentTurn + 1} / {turn?.numberOfTurns}{" "}
      </Text>
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
        {isDrawing ? (
          <Draw
            savedDrawing={savedDrawing}
            setSavedDrawing={setSavedDrawing}
            setIsDrawing={setIsDrawing}
            turn={turn}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        ) : (
          <Write
            savedDrawing={savedDrawing}
            setIsDrawing={setIsDrawing}
            turn={turn}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        )}
      </Flex>
    </Flex>
  );
}

const Draw = ({ savedDrawing, setSavedDrawing, setIsDrawing, turn, disabled, setDisabled}) => {
  const [largeCanvas] = useMediaQuery("(min-width: 48em)");

  return (
    <>
      {largeCanvas ? (
        <CanvasDraw
          disabled={disabled}
          brushRadius={7}
          lazyRadius={2}
          canvasWidth={600}
          canvasHeight={450}
          ref={(canvasDraw) => {
            if (canvasDraw) {
              setSavedDrawing(canvasDraw);
            }
          }}
        />
      ) : (
        <CanvasDraw
          disabled={disabled}
          brushRadius={4}
          lazyRadius={2}
          canvasWidth={300}
          canvasHeight={225}
          ref={(canvasDraw) => {
            if (canvasDraw) {
              setSavedDrawing(canvasDraw);
            }
          }}
        />
      )}
      <ReadyButton
        data={savedDrawing.getSaveData()}
        toggleIsDrawing={() => setIsDrawing(false)}
        turn={turn}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </>
  );
};

const LoadedCanvas = ({ savedDrawing }) => {
  const [largeCanvas] = useMediaQuery("(min-width: 48em)");
  return (
    <>
      {largeCanvas ? 
        <CanvasDraw
          disabled
          hideGrid
          brushRadius={7}
          lazyRadius={2}
          canvasWidth={600}
          canvasHeight={450}
          saveData={savedDrawing}
        />
        :
        <CanvasDraw
          disabled
          hideGrid
          brushRadius={4}
          lazyRadius={2}
          canvasWidth={300}
          canvasHeight={225}
          saveData={savedDrawing}
        />
      }
    </>
  );
};

const Write = ({ savedDrawing, setIsDrawing, turn, disabled, setDisabled}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log("saveddrawing", savedDrawing);
  }, [savedDrawing]);
  return (
    <>
      {savedDrawing ? <LoadedCanvas savedDrawing={savedDrawing} /> : null}
      <Text fontSize="2xl">
        {savedDrawing ? "Ecris ce que tu vois !" : "Ecris quelque chose !"}
      </Text>
      <Flex w="100%">
        <CoolInput
          flex={{ base: null, md: "9" }}
          setValue={setValue}
          maxLength="100"
          placeholder="Un mec qui code sur un lama"
          disabled={disabled}
        />
        <ReadyButton
          display={{ base: "none", md: "flex" }}
          toggleIsDrawing={() => setIsDrawing(true)}
          turn={turn}
          data={value}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      </Flex>
      <ReadyButton
        display={{ base: "flex", md: "none" }}
        toggleIsDrawing={() => setIsDrawing(true)}
        turn={turn}
        data={value}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </>
  );
};

const ReadyButton = ({
  turn,
  data,
  disabled,
  setDisabled,
  ...props
}) => {
  const socket = useContext(SocketContext);
  const onReady = () => {
    socket.emit("setTurnData", {
      data: data,
      currentTurn: turn.currentTurn,
      threadId: turn.threadId,
    });
    setDisabled(true);
  };

  return (
    <CoolButton disabled={disabled} onClick={onReady} leftIcon={<ReadyIcon />} {...props}>
      Terminé !
    </CoolButton>
  );
};

export default Start;
