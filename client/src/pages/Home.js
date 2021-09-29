import { Image } from '@chakra-ui/image';
import { Flex, Spacer } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import GetStarted from '../components/GetStarted'
import { makeURL } from '../helpers';
import title from '../images/title.png'

const Home = ({ setInviteURL }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setInviteURL(makeURL(id));
    }
  }, [id, setInviteURL]);
  return (
    <Flex h="100%" direction="column" alignItems="center" p="5">
      <Image maxH="150px" src={title} />
      <Spacer />
      <GetStarted id={id} />
      <Spacer />
    </Flex>
  );
};

export default Home;