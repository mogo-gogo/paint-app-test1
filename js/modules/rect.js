let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawingRect = false;
let startPoint = { x: null, y: null, image: null };

function rectStartPoint(e) {
    drawingRect = true;
    startPoint.x = e.clientX - canvas.getBoundingClientRect().left;
    startPoint.y = e.clientY - canvas.getBoundingClientRect().top;
    startPoint.image = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function resizeTheRect(e) {
    if (!drawingRect) return;
    ctx.putImageData(startPoint.image, 0, 0);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.strokeRect(
        startPoint.x,
        startPoint.y,
        e.clientX - canvas.getBoundingClientRect().left - startPoint.x,
        e.clientY - canvas.getBoundingClientRect().top - startPoint.y
        );
}

function rectEndPoint(e) {
    if (!drawingRect) return;
    startPoint.x = null;
    startPoint.y = null;
    startPoint.image = null;
    drawingRect = false;
}

export function initRectTool() {
    canvas.addEventListener("mousedown", rectStartPoint);

    document.addEventListener("mousemove", resizeTheRect);

    document.addEventListener("mouseup", rectEndPoint);
}

export function unInitRectTool() {
    canvas.removeEventListener("mousedown", rectStartPoint);

    document.removeEventListener("mousemove", resizeTheRect);

    document.removeEventListener("mouseup", rectEndPoint);
}
