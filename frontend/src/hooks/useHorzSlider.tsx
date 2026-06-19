import { useState, useCallback, useRef } from "react";

type UseHorzSliderReturn = [
  (node: HTMLElement | null) => void,
  {
    showLeftArrow: boolean;
    showRightArrow: boolean;
    scroll: (direction: "left" | "right") => void;
  },
];

export function useHorzSlider(): UseHorzSliderReturn {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const elementRef = useRef<HTMLElement | null>(null);
  const checkScroll = useCallback(() => {
    if (elementRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = elementRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  const refCallback = useCallback(
    (node: HTMLElement | null) => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }

      elementRef.current = node;

      if (node) {
        node.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        checkScroll();
      }
    },
    [checkScroll],
  );

  const scroll = useCallback((direction: "left" | "right") => {
    if (elementRef.current) {
      const { clientWidth } = elementRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;

      elementRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  return [refCallback, { showLeftArrow, showRightArrow, scroll }];
}
