import React, { useRef, useState, useEffect, RefObject } from 'react';

/**
 * @see :  https://usehooks.com/useHover/
 * @returns [refHover, isHover]
 */
export const useHover = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);

  const handleMouserOver = () => {
    setValue(true);
  };
  const handleMouseOut = () => {
    setValue(false);
  };
  useEffect(() => {
    const { current } = ref;
    if (current) {
      current.addEventListener('mouseover', handleMouserOver);

      current.addEventListener('mouseout', handleMouseOut);
    }
    return () => {
      if (current) {
        current.removeEventListener('mouseover', handleMouserOver);
        current.removeEventListener('mouseover', handleMouseOut);
      }
    };
  });

  return [ref, value];
};
