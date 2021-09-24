import { Flex, Spacer, Text } from '@chakra-ui/layout'
import React from 'react'
import GetStarted from '../components/GetStarted'

const Home = () => {
  return (
    <Flex h='100%' direction='column' alignItems="center" p="5">
      <Text p="2" fontSize='5xl'>GARTIC CLONE</Text>
      <Spacer/>
      <GetStarted/>
      <Spacer/>
    </Flex>
  )
}

export default Home