import { TILE } from "./game.mjs";
import { Vec2 } from "./math.mjs";
function drawText(ctx, text, x, y, size, color, align, baseline = "alphabetic") {
    ctx.save();
    ctx.font = `${size}px arial`;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
}
function drawButton(ctx, mouse, text, x, y, w, h) {
    const isHovered = mouse.isInsideRect({
        pos: new Vec2(x, y),
        size: new Vec2(w, h)
    });
    const isClicked = isHovered && mouse.isClicked;
    ctx.save();
    if (isHovered) {
        ctx.fillRect(x, y, w, h);
    }
    else {
        ctx.strokeRect(x, y, w, h);
    }
    ctx.restore();
    drawText(ctx, text, x + w / 2, y + h / 2, 1.1 * TILE, isHovered ? "white" : "black", "center", "middle");
    if (isHovered)
        mouse.style = "pointer";
    return isClicked;
}
export function drawTitle(ctx, title, x, y) {
    drawText(ctx, title, x, y, 2.5 * TILE, "black", "center");
}
export function drawPrimaryButton(ctx, mouse, text, x, y) {
    const w = 9 * TILE;
    const h = 3 * TILE;
    return drawButton(ctx, mouse, text, x - w / 2, y, w, h);
}
//# sourceMappingURL=ui.mjs.map