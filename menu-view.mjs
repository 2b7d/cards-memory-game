import { TILE } from "./game.mjs";
import { drawTitle, drawPrimaryButton } from "./ui.mjs";
export function drawMenu(ctx, state, mouse) {
    let cursory = ctx.canvas.height / 2 - 2 * TILE;
    const cx = ctx.canvas.width / 2;
    drawTitle(ctx, "Cards Memory Game", cx, cursory);
    cursory += 2 * TILE;
    if (drawPrimaryButton(ctx, mouse, "Start", cx, cursory))
        state.view = 1;
}
//# sourceMappingURL=menu-view.mjs.map