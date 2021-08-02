import React, { PropsWithChildren } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { getToken } from '@Common';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  svg {
    /* font-size: ${getToken('fontSize.xl')}; */
    font-size: 40px;
    text-align: center;
    margin: 10px 0;
  }
  padding: 10px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px;
`;

export type QualitieProps = PropsWithChildren<{
  text: string;
}>;

function Qualitie(props: QualitieProps) {
  return (
    <Wrapper>
      {props.children}
      <Text>{props.text}</Text>
    </Wrapper>
  );
}

export default Qualitie;
