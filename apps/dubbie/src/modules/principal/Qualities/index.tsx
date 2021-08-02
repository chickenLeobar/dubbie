import React, { ReactNode } from 'react';
import Qualitie from './Qualitie';
import { GrDeliver } from 'react-icons/gr';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { Container } from '@chakra-ui/react';

type TQualitie = {
  text: string;
  Icon: IconType;
};

const items: TQualitie[] = [
  {
    text: 'Envios rapidos y seguros',
    Icon: GrDeliver,
  },
  {
    text: '100% garantía y calidad',
    Icon: AiOutlineCheck,
  },
  {
    text: '100% Pagos seguros',
    Icon: RiSecurePaymentLine,
  },
];

function index() {
  return (
    <Container
      my={'24'}
      maxWidth="container.xl"
      d="flex"
      justifyContent="center"
    >
      {items.map((element, idx) => (
        <Qualitie key={idx} text={element.text}>
          {<element.Icon />}
        </Qualitie>
      ))}
    </Container>
  );
}

export default index;
