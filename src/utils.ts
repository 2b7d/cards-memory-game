import { Vec2 } from "./vec2";

type Shape = {
    pos: Vec2;
    w: number;
    h: number;
}

export function toFixed(float: number, precision: number): number {
    return Number(float.toFixed(precision));
}

export function getRelativeMouseCoords(event: MouseEvent): Vec2 {
    const { clientX, clientY, target } = event;
    const rect = (target as HTMLElement).getBoundingClientRect();

    return new Vec2(clientX - rect.left, clientY - rect.top);
}


export function isInside(s: Shape, mouse: Vec2): boolean {
    return mouse.x >= s.pos.x && mouse.x <= s.pos.x + s.w &&
        mouse.y >= s.pos.y && mouse.y <= s.pos.y + s.h;
}
