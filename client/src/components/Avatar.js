import { Avatar as ChakraAvatar } from '@chakra-ui/avatar'
import React from 'react'

const Avatar = ({name, ...props}) => {
  return (
    <ChakraAvatar ignoreFallback size="xl" src={`https://avatars.dicebear.com/api/bottts/${name}.svg`} {...props}/>
  )
}

export default Avatar