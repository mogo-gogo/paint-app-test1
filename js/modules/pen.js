let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawing = false;

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    draw(e);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
}

function endDrawing(e) {
    drawing = false;
    ctx.beginPath();
}

export function initPenTool() {
    canvas.addEventListener("mousedown", startDrawing);

    document.addEventListener("mousemove", draw);

    document.addEventListener("mouseup", endDrawing);
}

export function unInitPenTool() {
    if (canvas === null || ctx === null) return;
    canvas.removeEventListener("mousedown", startDrawing);

    document.removeEventListener("mousemove", draw);

    document.removeEventListener("mouseup", endDrawing);
}


