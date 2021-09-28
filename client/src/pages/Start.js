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
  const socket = useContext(SocketContext);
  const [turn, setTurn] = useState({})
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    if (socket) {
    socket.on("turnStart", (data) => {
      const tmpTurn = JSON.parse(data)
      setTurn(tmpTurn);
      setDisabled(false)
      setIsDrawing(tmpTurn.data.type === 'draw')
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
            turn={turn}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        ) : (
          <Write
            turn={turn}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        )}
      </Flex>
    </Flex>
  );
}

const Draw = ({ turn, disabled, setDisabled}) => {
  const [largeCanvas] = useMediaQuery("(min-width: 48em)");
  const [savedDrawing, setSavedDrawing] = useState(null);
  return (
    <>
      <Text fontSize="2xl">
        A toi de dessiner !
      </Text>
      <Text fontSize="2xl">
        {turn?.previousPlayerData?.data}
      </Text>
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
        turn={turn}
        disabled={disabled}
        setDisabled={setDisabled}
        setValue={setSavedDrawing}
        data={savedDrawing}
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
          canvasWidth={600}uu
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

const Write = ({ turn, disabled, setDisabled}) => {
  const [value, setValue] = useState("");
  const [previousDrawing, setPreviousDrawing] = useState(null);
  useEffect(() => {
    if (turn.previousPlayerData && turn.data.type === 'write') {
      setPreviousDrawing(turn.previousPlayerData.data)
    } else {
    setPreviousDrawing(null)
    }
  }, [turn])
  return (
    <>
      <Text fontSize="2xl">
        {turn?.previousPlayerData ? "Ecris ce que tu vois !" : "Ecris quelque chose !"}
      </Text>
      {previousDrawing ? <LoadedCanvas savedDrawing={previousDrawing} /> : null}
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
          turn={turn}
          data={value}
          disabled={disabled}
          setDisabled={setDisabled}
          setValue={setValue}
        />
      </Flex>
      <ReadyButton
        display={{ base: "flex", md: "none" }}
        turn={turn}
        data={value}
        disabled={disabled}
        setDisabled={setDisabled}
          setValue={setValue}
      />
    </>
  );
};

const ReadyButton = ({
  turn,
  data,
  disabled,
  setDisabled,
  setValue,
  ...props
}) => {
  const socket = useContext(SocketContext);
  const onReady = () => {
    if (turn?.data?.type === "draw") {
      data = data.getSaveData();
    }
    socket.emit("setTurnData", {
      data: data,
      currentTurn: turn.currentTurn,
      threadId: turn.threadId,
    });
    setDisabled(true);
    setValue(null);
  };

  return (
    <CoolButton
      disabled={disabled}
      onClick={onReady}
      leftIcon={<ReadyIcon />}
      {...props}
    >
      Terminé !
    </CoolButton>
  );
};

export default Start;
