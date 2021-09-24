import { Button } from '@chakra-ui/button'
import React from 'react'
import PlayIcon from './svg/PlayIcon'

const CoolButton = ({children, ...props}) => {
  return (
    <Button
      m="4"
      w="fit-content"
      leftIcon={<PlayIcon />}
      bg="white"
      color="#301A6B"
      fontFamily="revert"
      textTransform="uppercase"
      fontWeight="bold"
      boxShadow="0px 6px 0px 0px #301a6b"
      {...props}
    >
      {children || "Démarrer"}
    </Button>
  );
}

export default CoolButton
