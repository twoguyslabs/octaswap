import { useEffect, useState, useRef } from "react";

export default function useElementWidth() {
  const elementRef = useRef<HTMLElement | null>(null);
  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === elementRef.current) {
          const newWidth = entry.contentRect.width;
          setElementWidth(newWidth);
        }
      }
    });

    resizeObserver.observe(elementRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { elementRef, elementWidth };
}
