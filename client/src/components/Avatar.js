import { Avatar as ChakraAvatar } from '@chakra-ui/avatar'
import React from 'react'

const Avatar = ({name}) => {
  return (
    <ChakraAvatar ignoreFallback size="xl" src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}/>
  )
}

export default Avatar