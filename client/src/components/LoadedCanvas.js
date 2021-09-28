import { useMediaQuery } from '@chakra-ui/media-query';
import React from 'react'
import CanvasDraw from 'react-canvas-draw';

const LoadedCanvas = ({ savedDrawing, ...props }) => {
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
          {...props}
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
          {...props}
        />
      }
    </>
  );
};

export default LoadedCanvas