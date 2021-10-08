import React from "react";
import {
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
} from "@chakra-ui/react";

function Description() {
  return (
    <AccordionItem>
      <AccordionButton bg="secondary">
        Descripción
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ad
        aut blanditiis illo aperiam enim nemo quibusdam quisquam cum, cupiditate
        optio, nisi quae sequi modi soluta consectetur pariatur dicta quam.
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Description;
