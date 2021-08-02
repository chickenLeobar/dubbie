import { useRef, useEffect } from "react";

export const useRefBody = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const doc = document || null;
    if (doc) {
      ref.current = doc.body;
    }
  });
  return ref;
};
