import { useRef, useCallback, MouseEvent, TouchEvent } from "react";

type LongPressCallback = (event: MouseEvent<any> | TouchEvent<any>) => void;

interface LongPressOptions {
  ms?: number;
  shouldPreventDefault?: boolean;
}

export function useLongPress(
  callback: LongPressCallback,
  { ms = 300, shouldPreventDefault = true }: LongPressOptions = {},
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasLongPress = useRef<boolean>(false);
  const start = useCallback(
    (event: MouseEvent<any> | TouchEvent<any>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      wasLongPress.current = false;
      timerRef.current = setTimeout(() => {
        wasLongPress.current = true;
        callback(event);
      }, ms);
    },
    [callback, ms, shouldPreventDefault],
  );

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  const handleInterceptClick = useCallback(
    (event: MouseEvent<any>, userOnClick: () => void) => {
      if (wasLongPress.current) {
        event.preventDefault();
        event.stopPropagation();
        wasLongPress.current = false;
        return;
      }
      userOnClick();
    },
    [],
  );
  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
    bindClick: (userOnClick: () => void) => (e: MouseEvent<any>) =>
      handleInterceptClick(e, userOnClick),
  };
}
