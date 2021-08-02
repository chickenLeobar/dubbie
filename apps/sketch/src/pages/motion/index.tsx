import React from 'react';
import { motion, TargetAndTransition, Variants } from 'framer-motion';

const H1Variants: Variants = {
  initial: {
    y: '-50%',
  },
  animate: { x: ['10%', '20%', '50%'], y: '50%' },
  transition: { delay: 2, duration: 3, type: 'tween' } as TargetAndTransition,
};
function index() {
  return (
    <div>
      <motion.h1 variants={H1Variants} initial="initial" animate="animate">
        Hello world
      </motion.h1>
    </div>
  );
}

export default index;
