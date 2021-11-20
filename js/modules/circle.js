let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawingCircle = false;
let startPoint = { x: null, y: null, image: null };

function calcDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function circleStartPoint(e) {
    drawingCircle = true;
    startPoint.x = e.clientX - canvas.getBoundingClientRect().left;
    startPoint.y = e.clientY - canvas.getBoundingClientRect().top;
    startPoint.image = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function resizeTheCircle(e) {
    if (!drawingCircle) return;
    ctx.putImageData(startPoint.image, 0, 0);
    ctx.beginPath();
    // ctx.moveTo(startPoint.x, startPoint.y);
    ctx.arc(
        startPoint.x,
        startPoint.y,
        calcDist(
            startPoint.x,
            startPoint.y,
            e.clientX - canvas.getBoundingClientRect().left,
            e.clientY - canvas.getBoundingClientRect().top
        ),
        0,
        Math.PI * 2,
        false);
    ctx.stroke();
}

function circleEndPoint(e) {
    if (!drawingCircle) return;
    startPoint.x = null;
    startPoint.y = null;
    startPoint.image = null;
    drawingCircle = false;
}

export function initCircleTool() {
    canvas.addEventListener("mousedown", circleStartPoint);

    document.addEventListener("mousemove", resizeTheCircle);

    document.addEventListener("mouseup", circleEndPoint);
}

export function unInitCircleTool() {
    canvas.removeEventListener("mousedown", circleStartPoint);

    document.removeEventListener("mousemove", resizeTheCircle);

    document.removeEventListener("mouseup", circleEndPoint);
}
