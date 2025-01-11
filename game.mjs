import { Vec2, Vec4, clamp } from "./math.mjs";
export const [CANVAS_WIDTH, CANVAS_HEIGHT] = (() => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let maxw = 600;
    let maxh = 700;
    if (w > maxw)
        w = maxw;
    if (h > maxh)
        h = maxh;
    return [w, h];
})();
export const TILE = 25 * CANVAS_WIDTH / CANVAS_HEIGHT;
export const CARD_WIDTH = 4 * TILE;
export const CARD_HEIGHT = 5 * TILE;
export const LEVEL_ROWS = 4;
export const LEVEL_COLS = 4;
export const LEVEL_ROW_GAP = 2 * TILE;
export const LEVEL_COL_GAP = 2 * TILE;
export const LEVEL_WIDTH = LEVEL_COLS * CARD_WIDTH + (LEVEL_COLS - 1) * LEVEL_COL_GAP;
export const LEVEL_HEIGHT = LEVEL_ROWS * CARD_HEIGHT + (LEVEL_ROWS - 1) * LEVEL_ROW_GAP;
class Color extends Vec4 {
    constructor(r, g, b, a = 1) {
        super(r, g, b, a);
    }
    isEqual(that) {
        return this.x === that.x &&
            this.y === that.y &&
            this.z === that.z &&
            this.w === that.w;
    }
    toCSS() {
        return `rgb(${this.x} ${this.y} ${this.z} / ${this.w})`;
    }
}
export class Mouse {
    pos = new Vec2(0, 0);
    isClicked = false;
    style = "default";
    constructor(canvas) {
        canvas.addEventListener("mousemove", event => {
            this.pos.x = event.x - canvas.offsetLeft;
            this.pos.y = event.y - canvas.offsetTop;
        });
        canvas.addEventListener("click", () => {
            this.isClicked = true;
        });
    }
    reset() {
        this.isClicked = false;
        this.style = "default";
    }
    isInsideRect(r) {
        return this.pos.x >= r.pos.x && this.pos.x <= r.pos.x + r.size.x &&
            this.pos.y >= r.pos.y && this.pos.y <= r.pos.y + r.size.y;
    }
}
export class Card {
    pos;
    size = new Vec2(CARD_WIDTH, CARD_HEIGHT);
    color;
    isClosed = true;
    scale = 1;
    dscale = 0;
    dalpha = 0;
    get isAnimating() {
        return this.dscale !== 0 || this.dalpha !== 0;
    }
    get isFaded() {
        return this.color.front.w === 0;
    }
    get isOpen() {
        return !this.isClosed;
    }
    constructor(pos, front, back = new Color(0, 0, 0)) {
        this.pos = pos;
        this.color = { front, back };
    }
    draw(ctx) {
        ctx.save();
        const cx = this.pos.x + this.size.x / 2;
        const cy = this.pos.y + this.size.y / 2;
        ctx.translate(cx, cy);
        ctx.scale(this.scale, 1);
        ctx.translate(-cx, -cy);
        let color = this.isClosed ? this.color.back : this.color.front;
        if (window.isDrawFront)
            color = this.color.front;
        ctx.fillStyle = color.toCSS();
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.restore();
    }
    update(dt) {
        this.scale += this.dscale * window.flipSpeed * dt;
        this.scale = clamp(this.scale, 0, 1);
        if (this.scale === 0) {
            this.dscale = 1;
            this.isClosed = !this.isClosed;
        }
        else if (this.scale === 1) {
            this.dscale = 0;
        }
        const color = this.color.front;
        color.w += this.dalpha * window.fadeoutSpeed * dt;
        color.w = clamp(color.w, 0, 1);
        if (color.w === 0)
            this.dalpha = 0;
    }
}
export function assert(cond, usermsg = "") {
    if (!cond) {
        let msg = "Assertion failed";
        if (usermsg)
            msg += `: ${usermsg}`;
        throw new Error(msg);
    }
}
export function initContext() {
    const c = document.createElement("canvas");
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    const ctx = c.getContext("2d");
    if (!ctx)
        throw new Error("failed to get context from canvas");
    document.body.appendChild(c);
    return ctx;
}
export function initCards() {
    const tmp = [];
    const cx = CANVAS_WIDTH / 2 - LEVEL_WIDTH / 2;
    const cy = CANVAS_HEIGHT / 2 - LEVEL_HEIGHT / 2;
    const colors = [
        [0, 0, 255],
        [0, 255, 0],
        [0, 255, 255],
        [255, 0, 0],
        [255, 0, 255],
        [255, 255, 0],
    ];
    for (let y = 0; y < LEVEL_ROWS; y++) {
        for (let x = 0; x < LEVEL_COLS; x++) {
            tmp.push(new Card(new Vec2(x * CARD_WIDTH + x * LEVEL_COL_GAP + cx, y * CARD_HEIGHT + y * LEVEL_ROW_GAP + cy), new Color(...colors[x])));
        }
    }
    return tmp;
}
export function restart(state) {
    state.view = 1;
    state.cards = initCards();
    state.selected = [];
    state.lives = 3;
}
//# sourceMappingURL=game.mjs.map