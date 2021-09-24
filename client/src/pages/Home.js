import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import GetStarted from '../components/GetStarted'

const Home = () => {
  return (
    <Flex direction='column' alignItems="center" p="5">
      <Text p="2" fontSize='5xl'>GARTIC CLONE</Text>
      <GetStarted/>
    </Flex>
  )
}

export default Home