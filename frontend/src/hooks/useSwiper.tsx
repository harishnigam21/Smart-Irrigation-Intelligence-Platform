"use client";

import { useRef } from "react";

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 60,
}: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    currentX.current = e.clientX;
    dragging.current = true;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    currentX.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!dragging.current) return;

    const distance = currentX.current - startX.current;

    if (distance > threshold) {
      onSwipeRight?.();
    }

    if (distance < -threshold) {
      onSwipeLeft?.();
    }

    dragging.current = false;
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
}
