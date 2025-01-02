window.isDrawGrid = true;
window.isDrawFront = false;
window.flipSpeed = 6.5;
window.fadeoutSpeed = 3.5;
window.delayTime = 0.15;

document.addEventListener("keypress", event => {
    switch (event.code) {
    case "KeyG":
        window.isDrawGrid = !window.isDrawGrid;
        break;
    case "KeyF":
        window.isDrawFront = !window.isDrawFront;
        break;
    default:
        return;
    }
});
