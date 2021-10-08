import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, chakra, useBoolean } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Variants, useAnimation, AnimatePresence } from "framer-motion";

const BoxMotion = chakra(motion.div);

import { getToken } from "@Common";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: ${getToken("colors.black")};
`;
const Nav = styled(motion.div)`
  position: fixed;
  height: 100vh;
  width: 350px;
  background: ${getToken("colors.white")};
`;

const List = styled(motion.ul)`
  color: ${getToken("colors.black")};
  list-style-type: none;
  text-align: center;
  height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const WrapperIcon = styled(motion.button)`
  position: absolute;
  svg {
    color: black;
    font-size: 35px;
  }
  z-index: 100;
  cursor: pointer;
  left: 10px;
  top: 20px;
  background: white;
`;

const CircleEl = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: ${getToken("colors.white")};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 20%;
`;

export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

const variantsMenu: Variants = {
  open: (height: number = 1000) => ({
    opacity: 1,
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      duration: 0.5,
      staggerChildren: 1,
      stiffness: 20,
      restDelta: 2,
    },
  }),
  close: {
    clipPath: "circle(30px at 40px 40px)",
    opacity: 0,
    transition: {
      type: "spring",
      delay: 0.5,
      stiffness: 400,
      damping: 40,
    },
  },
};

const variantIcon: Variants = {
  close: {
    borderRadius: "50%",
    padding: "10px",
  },
  open: {},
};

const liVariants: Variants = {
  visible: (i: number) => {
    return {
      opacity: 1,
      x: "0",
      transition: {
        delay: i * 0.4,
        type: "spring",
      },
    };
  },
  hidden: {
    opacity: 0,
    x: "-20%",
  },
  inTap: {
    scale: 0.8,
  },
};

const CloseAndOpenIcon = ({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}) => {
  return (
    <WrapperIcon
      variants={variantIcon}
      animate={open ? "open" : "close"}
      onClick={handler}
    >
      {open ? <AiOutlineMenu /> : <AiOutlineClose />}
    </WrapperIcon>
  );
};
function Menu() {
  const fakeMenu = ["Hola", "Wenas", "noches"];
  const controls = useAnimation();
  const [value, setValue] = useState(false);
  const menuRef = useRef();
  const { height } = useDimensions(menuRef);

  useEffect(() => {
    if (value) {
      controls.start("open");
    } else {
      controls.start("close");
    }
  }, [value]);

  return (
    <Wrapper>
      <CircleEl />
      <CloseAndOpenIcon handler={() => setValue(!value)} open={value} />
      <Nav
        custom={height}
        ref={menuRef}
        animate={controls}
        variants={variantsMenu}
      >
        <List>
          {fakeMenu.map((item, idx) => (
            <motion.li
              variants={liVariants}
              custom={idx}
              animate={value ? "visible" : "hidden"}
              key={idx}
              whileTap="inTap"
            >
              {item}
            </motion.li>
          ))}
        </List>
      </Nav>
    </Wrapper>
  );
}

export default Menu;
