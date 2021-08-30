import { TILE } from "./constants";
import { toFixed } from "./utils";
import * as vec2 from "./vec2";

type CardColor = {
  front: string;
  back: string;
}

export type Card = {
  pos: vec2.Vec2;
  center: vec2.Vec2;
  scale: number;
  dscale: number;
  w: number;
  h: number;
  color: CardColor;
  alpha: number;
  dalpha: number;
}

export function create(x: number, y: number, frontColor: string): Card {
  const pos = vec2.create(x, y);
  const w = 2 * TILE;
  const h = 3 * TILE;
  const center = vec2.create(x + w / 2, y + h / 2);

  return {
    pos,
    center,
    scale: 1,
    dscale: 0,
    w, h,
    color: { back: "black", front: frontColor },
    alpha: 1,
    dalpha: 0
  };
}

export function draw(c: Card, ctx: CanvasRenderingContext2D) {
  ctx.translate(c.center.x, c.center.y);
  ctx.scale(c.scale, 1);
  ctx.translate(-c.center.x, -c.center.y);
  const color = `rgba(${c.scale > 0 ? "0, 0, 0" : "255, 0, 0"}, ${c.alpha})`;
  ctx.fillStyle = color;
  ctx.fillRect(c.pos.x, c.pos.y, c.w, c.h);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function update(c: Card, dt: number) {
  c.scale = toFixed(c.scale + c.dscale * dt, 1);
  if (c.scale <= -1 || c.scale >= 1) {
    c.dscale = 0;
  }

  c.alpha += c.dalpha * dt;
  if (c.alpha >= 1 || c.alpha <= 0) {
    c.dalpha = 0;
  }
}
