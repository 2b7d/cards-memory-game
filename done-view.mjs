import { restart, TILE } from "./game.mjs";
import { drawTitle, drawPrimaryButton } from "./ui.mjs";
export function drawDone(ctx, state, mouse) {
    let cursory = ctx.canvas.height / 2 - 2 * TILE;
    const cx = ctx.canvas.width / 2;
    const title = state.lives > 0 ? "You are the Winner!" : "Game Over!";
    drawTitle(ctx, title, cx, cursory);
    cursory += 2 * TILE;
    const text = state.lives > 0 ? "Play again" : "Try again";
    if (drawPrimaryButton(ctx, mouse, text, cx, cursory))
        restart(state);
    cursory += 4 * TILE;
    if (drawPrimaryButton(ctx, mouse, "Back to menu", cx, cursory)) {
        restart(state);
        state.view = 0;
    }
}
//# sourceMappingURL=done-view.mjs.map