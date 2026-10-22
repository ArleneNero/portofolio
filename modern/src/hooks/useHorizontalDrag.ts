import { useRef, useState } from 'react';
import type { PointerEventHandler, MouseEventHandler } from 'react';

type DragState = { origin: number; initialScroll: number; active: boolean } | null;
const DRAG_THRESHOLD = 7;

/** Desktop mouse-drag; touch remains native scroll so vertical scrolling is not hijacked. */
export function useHorizontalDrag() {
  const start = useRef<DragState>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    start.current = { origin: event.clientX, initialScroll: event.currentTarget.scrollLeft, active: false };
    suppressClick.current = false;
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const current = start.current;
    if (!current) return;
    const movement = event.clientX - current.origin;
    if (!current.active && Math.abs(movement) > DRAG_THRESHOLD) {
      current.active = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    if (current.active) event.currentTarget.scrollLeft = current.initialScroll - movement;
  };

  const finish: PointerEventHandler<HTMLDivElement> = (event) => {
    if (start.current?.active && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    start.current = null;
    setDragging(false);
  };

  const onClickCapture: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  return {
    dragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
      onLostPointerCapture: () => { start.current = null; setDragging(false); },
      onClickCapture,
    },
  };
}
