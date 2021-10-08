import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Box, chakra, Container } from '@chakra-ui/react';
import { getToken } from '@Common';
import { Variants } from 'framer-motion';
import { FaHandHolding } from 'react-icons/fa';
const ContainerBack = styled(motion.div)`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2.2rem;
  grid-auto-flow: dense;

  height: 100vh;
  align-items: center;
`;

const _CardBox = styled(motion.div)`
  cursor: pointer;
`;

const CardBox = chakra(_CardBox);

const IConBox = styled(motion.div)(`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
svg{
  font-size : 35px;
}
`);

const cardVariants: Variants = {
  beforeHover: {},
  onHover: {
    scale: 1.1,
  },
};

const iconVariants: Variants = {
  beforeHover: {
    opacity: 0,
    y: -50,
  },
  onHover: {
    scale: 1.5,
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
};

const CardContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <CardBox
      width="250px"
      height="250px"
      shadow="lg"
      bg={'white'}
      borderRadius="2xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      variants={cardVariants}
      initial="beforeHover"
      whileHover="onHover"
    >
      <IConBox
        variants={iconVariants}
        initial="beforeHover"
        whileHover="onHover"
      >
        {children}
      </IConBox>
    </CardBox>
  );
};

const H1 = chakra(motion.h1);

function Shop() {
  return (
    <Box
      bg={'blue.300'}
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgColor="blue.300"
    >
      <H1
        fontWeight="black"
        color="white"
        fontSize="5xl"
        my={3}
        initial={{ x: '-150px' }}
        animate={{ x: '0' }}
      >
        Welcome to react shop
      </H1>
      <ContainerBack style={{ width: '1050px' }}>
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <CardContainer key={idx}>
              <FaHandHolding />
            </CardContainer>
          ))}
      </ContainerBack>
    </Box>
  );
}

export default Shop;
