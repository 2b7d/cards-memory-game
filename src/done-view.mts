import {View, restart, TILE, State, Mouse} from "./game.mjs";
import {drawTitle, drawPrimaryButton} from "./ui.mjs";

export function drawDone(ctx: CanvasRenderingContext2D, state: State, mouse: Mouse): void {
    let cursory = ctx.canvas.height / 2 - 2 * TILE;
    const cx = ctx.canvas.width / 2;

    const title = state.lives > 0 ? "You are the Winner!" : "Game Over!";
    drawTitle(ctx, title, cx, cursory);

    cursory += 2 * TILE;

    const text = state.lives > 0 ? "Play again" : "Try again";
    if (drawPrimaryButton(ctx, mouse, text, cx, cursory)) restart(state);

    cursory += 4 * TILE;

    if (drawPrimaryButton(ctx, mouse, "Back to menu", cx, cursory)) {
        restart(state);
        state.view = View.Menu;
    }
}
