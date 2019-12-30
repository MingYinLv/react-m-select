import { RefObject, useEffect } from 'react';
import useRafState from 'react-use/lib/useRafState';

export interface State {
  eventType: EventType;
  prevEventType: EventType;
  directions: {
    vertical: number;
    horizontal: number;
  };
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  moveX: number;
  moveY: number;
}

export enum EventType {
  None = '',
  Start = 'Start',
  Move = 'Move',
  End = 'End',
}

const useTouch = (ref: RefObject<Element>): State => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('useTouch expects a single ref argument.');
    }
  }

  const [state, setState] = useRafState<State>({
    eventType: EventType.None,
    prevEventType: EventType.None,
    directions: {
      vertical: 0,
      horizontal: 0,
    },
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    moveX: 0,
    moveY: 0,
  });

  const setFullState = args => {
    setState(prev => ({
      ...prev,
      prevEventType: prev.eventType,
      ...args,
    }));
  };

  const touchStartHandle = (event: TouchEvent) => {
    const target = event.changedTouches[0];
    setFullState({
      eventType: EventType.Start,
      startX: target.clientX,
      startY: target.clientY,
      directions: {
        vertical: 0,
        horizontal: 0,
      },
    });
  };

  const touchMoveHandle = (event: TouchEvent) => {
    setState(prev => {
      const { clientX, clientY } = event.changedTouches[0];
      const prevX = prev.eventType === EventType.Move ? prev.moveX : prev.startX;
      const prevY = prev.eventType === EventType.Move ? prev.moveY : prev.startY;
      const directions = {
        vertical: prevY - clientY,
        horizontal: prevX - clientX,
      };
      return {
        ...prev,
        directions,
        prevEventType: prev.eventType,
        eventType: EventType.Move,
        moveX: clientX,
        moveY: clientY,
      };
    });
  };

  const touchEndHandle = (event: TouchEvent) => {
    const target = event.changedTouches[0];
    setFullState({
      eventType: EventType.End,
      endX: target.clientX,
      endY: target.clientY,
    });
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('touchstart', touchStartHandle);
      ref.current.addEventListener('touchmove', touchMoveHandle);
      ref.current.addEventListener('touchend', touchEndHandle);
    }
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('touchstart', touchStartHandle);
        ref.current.removeEventListener('touchmove', touchMoveHandle);
        ref.current.removeEventListener('touchend', touchEndHandle);
      }
    };
  }, [ref]);

  return state;
};

export default useTouch;
