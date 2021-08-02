import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { SwiperSlide } from "swiper/swiper-react";
import styled from "@emotion/styled";
import { getToken } from "@Common";

import Image from "next/image";
import { motion } from "framer-motion";

const ImageSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const _BackSqure = ({ className }: { className?: string }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity }}
      className={className}
    ></motion.div>
  );
};

const BackSqure = styled(_BackSqure)`
  width: 350px;
  height: 350px;
  background: ${getToken("colors.white")};
  border-radius: ${getToken("radii.lg")};
  position: absolute;
`;

import { Product } from "@dubbie/@types/eccomerce.types";

// type Props = {
//   product: Product;
// };

function Default() {
  return (
    <>
      <VStack spacing={8} width={"45%"} className="side" alignItems="start">
        <Heading as="h1" size="3xl" color="white">
          MEJORA LA EXPERIENCIA DE JUEGO
        </Heading>
        <Text color="white">
          Este es un excelente accesorio para que puedas mejorar tus habilidades
          en los juegos de tu teléfono como:
        </Text>
        <Button variant="white">Comprar</Button>
      </VStack>
      <ImageSide className="side" style={{ width: "50%" }}>
        <BackSqure />
        <Image src={"/products/mando.png"} width={450} height={450} />
      </ImageSide>
    </>
  );
}

export default Default;
