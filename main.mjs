import "./init.mjs";
import { assert, initContext, TILE, initCards, Mouse } from "./game.mjs";
import { handleGameInput, updateGame, drawGame } from "./game-view.mjs";
import { drawDone } from "./done-view.mjs";
import { drawMenu } from "./menu-view.mjs";
const ctx = initContext();
const mouse = new Mouse(ctx.canvas);
const state = {
    view: 0,
    cards: initCards(),
    selected: [],
    lives: 3,
};
let prevtime = 0;
function gameLoop(time) {
    const dt = (time - prevtime) / 1000;
    prevtime = time;
    if (state.view === 1) {
        handleGameInput(mouse, state);
        updateGame(mouse, state, dt);
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (window.isDrawGrid) {
        ctx.save();
        ctx.beginPath();
        for (let x = TILE; x < ctx.canvas.width; x += TILE) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
        }
        for (let y = TILE; y < ctx.canvas.height; y += TILE) {
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
        }
        ctx.strokeStyle = "lightgray";
        ctx.stroke();
        ctx.restore();
    }
    switch (state.view) {
        case 0:
            drawMenu(ctx, state, mouse);
            break;
        case 1:
            drawGame(ctx, state);
            break;
        case 2:
            drawDone(ctx, state, mouse);
            break;
        default:
            assert(false, "Unreachable");
    }
    ctx.canvas.style.cursor = mouse.style;
    mouse.reset();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(time => {
    prevtime = time;
    gameLoop(time);
});
//# sourceMappingURL=main.mjs.map