import { Box, Flex, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import CoolButton from '../components/CoolButton';
import CoolInput from '../components/CoolInput';
import ReadyIcon from '../components/svg/ReadyIcon';


const Start = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [savedDrawing, setSavedDrawing] = useState(null);
  return (
    <Flex direction="column" h="100%" alignItems="center" p="5" justify="center">
      <Flex flex='1' m="2" p="5" direction="column" bg="rgba(80,24,81,.25)" minW="80%" minH="80%" alignItems="center" justify="center">
      {isDrawing ? <Draw savedDrawing={savedDrawing} setSavedDrawing={setSavedDrawing} setIsDrawing={setIsDrawing}/> : <Write savedDrawing={savedDrawing} setIsDrawing={setIsDrawing}/>}
      </Flex>
    </Flex>
  )
}

const Draw = ({ savedDrawing, setSavedDrawing, setIsDrawing }) => {
  const [largeCanvas] = useMediaQuery("(min-width: 48em)");

  return (
    <>
      {largeCanvas ? (
        <CanvasDraw
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
        setSavedDrawing={setSavedDrawing}
        savedDrawing={savedDrawing}
        toggleIsDrawing={() => setIsDrawing(false)}
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

const Write = ({ savedDrawing, setIsDrawing }) => {
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
        />
        <ReadyButton
          display={{ base: "none", md: "flex" }}
          toggleIsDrawing={() => setIsDrawing(true)}
        />
      </Flex>
      <ReadyButton
        display={{ base: "flex", md: "none" }}
        toggleIsDrawing={() => setIsDrawing(true)}
      />
    </>
  );
};

const ReadyButton = ({
  savedDrawing,
  setSavedDrawing,
  toggleIsDrawing,
  ...props
}) => {
  const onReady = () => {
    if (savedDrawing) {
      setSavedDrawing(savedDrawing.getSaveData());
    }
    toggleIsDrawing();
  };

  return (
    <CoolButton onClick={onReady} leftIcon={<ReadyIcon />} {...props}>
      Terminé !
    </CoolButton>
  );
};

export default Start;
