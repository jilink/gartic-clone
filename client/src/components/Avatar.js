import { Avatar as ChakraAvatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import React from 'react'

const Avatar = ({name}) => {
  return (
    <ChakraAvatar ignoreFallback size="xl" src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}/>
  )
}

export default Avatar
