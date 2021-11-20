let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawingLine = false;
let startPoint = {x: null, y: null, image: null};

function lineStartPoint(e) {
    drawingLine = true;
    startPoint.x = e.clientX - canvas.getBoundingClientRect().left;
    startPoint.y = e.clientY - canvas.getBoundingClientRect().top;
    startPoint.image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
}

function resizeTheLine(e) {
    if (!drawingLine) return;
    ctx.putImageData(startPoint.image, 0, 0);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    ctx.stroke();
}

function lineEndPoint(e) {
    if (!drawingLine) return;
    startPoint.x = null;
    startPoint.y = null;
    startPoint.image = null;
    drawingLine = false;
}

export function initLineTool() {
    canvas.addEventListener("mousedown", lineStartPoint);

    document.addEventListener("mousemove", resizeTheLine);

    document.addEventListener("mouseup", lineEndPoint);
}

export function unInitLineTool() {
    canvas.removeEventListener("mousedown", lineStartPoint);

    document.removeEventListener("mousemove", resizeTheLine);

    document.removeEventListener("mouseup", lineEndPoint);
}
