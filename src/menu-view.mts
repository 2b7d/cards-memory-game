import {View, TILE, State, Mouse} from "./game.mjs";
import {drawTitle, drawPrimaryButton} from "./ui.mjs";

export function drawMenu(ctx: CanvasRenderingContext2D, state: State, mouse: Mouse): void {
    let cursory = ctx.canvas.height / 2 - 2 * TILE;
    const cx = ctx.canvas.width / 2;

    drawTitle(ctx, "Cards Memory Game", cx, cursory);

    cursory += 2 * TILE;

    if (drawPrimaryButton(ctx, mouse, "Start", cx, cursory)) state.view = View.Game;
}
