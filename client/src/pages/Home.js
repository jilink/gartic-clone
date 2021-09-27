import { Flex, Spacer, Text } from '@chakra-ui/layout'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import GetStarted from '../components/GetStarted'
import { makeURL } from '../helpers';

const Home = ({ setInviteURL }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setInviteURL(makeURL(id));
    }
  }, []);
  return (
    <Flex h="100%" direction="column" alignItems="center" p="5">
      <Text p="2" fontSize="5xl">
        GARTIC CLONE
      </Text>
      <Spacer />
      <GetStarted id={id} />
      <Spacer />
    </Flex>
  );
};

export default Home;