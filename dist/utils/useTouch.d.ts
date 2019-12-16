import { RefObject } from 'react';
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
export declare enum EventType {
    None = "",
    Start = "Start",
    Move = "Move",
    End = "End"
}
declare const useTouch: (ref: RefObject<Element>) => State;
export default useTouch;
