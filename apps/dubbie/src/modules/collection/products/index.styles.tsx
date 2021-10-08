import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { getToken } from "@Common";

export const GridCollection = styled(motion.div)`
  display: grid;
  grid-template-areas: ". bar bar bar" "filters products products products";
  grid-template-columns: 280px repeat(3, 1fr);
  grid-row: 50px auto;
  width: 100%;
  .filters {
    max-width: 250px;
    overflow: hidden;
  }
`;

export const IconBoxBar = styled.button`
  border: none;
  outline: none;
  svg {
    font-size: 20px;
  }
`;

export const GriProducts = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: row dense;
  width: 100%;
  grid-gap: 10px;
  justify-items: center;
  overflow-y: scroll;
  max-height: 80vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    //general scroll bar
    width: 0.5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    //track es el pedacito que se mueve en el scroll
    background: ${getToken("colors.gray.900")};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    //las esquinas del scroll bar
    background: transparent;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;
