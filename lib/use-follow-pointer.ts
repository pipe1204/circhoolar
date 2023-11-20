import { useState, RefObject, useEffect } from "react";

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (!ref.current) return;

      const cardRect = ref.current.getBoundingClientRect();
      let x = clientX - cardRect.left - cardRect.width / 2;
      let y = clientY - cardRect.top - cardRect.height / 2;

      // Constrain the movement within the card
      x = Math.max(Math.min(x, cardRect.width / 2), -cardRect.width / 2);
      y = Math.max(Math.min(y, cardRect.height / 2), -cardRect.height / 2);

      setPoint({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref]);

  return point;
}