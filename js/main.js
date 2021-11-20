// imports
import { initPenTool, unInitPenTool } from "./modules/pen.js"
import { initFillTool, unInitFillTool } from "./modules/fill.js"
import { initLineTool, unInitLineTool } from "./modules/line.js"
import { initRectTool, unInitRectTool } from "./modules/rect.js"
import { initCircleTool, unInitCircleTool } from "./modules/circle.js"

// constants

// global variables
let canvasContainer = document.getElementById("canvas-container");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let penBtn = document.getElementById("pen-tool");
let fillBtn = document.getElementById("fill-tool");
let lineBtn = document.getElementById("line-tool");
let rectBtn = document.getElementById("rect-tool");
let circleBtn = document.getElementById("circle-tool");

let resizeHandles = document.querySelectorAll(".resize-canvas");
let resizing = { right: false, bottom: false, bottomRight: false };

// helper functions
function resizeCanvas(width, height) {
    let saveCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height)
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(saveCanvas, 0, 0);
}

function unInitAll() {
    unInitPenTool();
    unInitFillTool();
    unInitLineTool();
    unInitRectTool();
    unInitCircleTool();
}

function userResizeCanvas(e) {
    if (resizing.right) {
        canvasContainer.style.width = `${e.clientX - canvas.getBoundingClientRect().left}px`
        // canvasContainer.style.height =  `${canvas.height}px`;
    }
    else if (resizing.bottom) {
        // canvasContainer.style.width = `${canvas.width}px`
        canvasContainer.style.height = `${e.clientY - canvas.getBoundingClientRect().top}px`;
    }
    else if (resizing.bottomRight) {
        canvasContainer.style.width = `${e.clientX - canvas.getBoundingClientRect().left}px`
        canvasContainer.style.height = `${e.clientY - canvas.getBoundingClientRect().top}px`;
        // resizeCanvas(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }
    else
        return;
}

// setups 
resizeCanvas(parseFloat(canvasContainer.style.width), parseFloat(canvasContainer.style.height));
resizeHandles.forEach(handle => {
    handle.addEventListener("mousedown", (e) => {
        if (resizing.right && resizing.bottom && resizing.bottomRight) return;
        canvasContainer.classList.add("outlined")
        if (e.target.id === "resize-canvas-bottom")
            resizing.bottom = true;
        else if (e.target.id === "resize-canvas-right")
            resizing.right = true;
        else if (e.target.id === "resize-canvas-bottom-right")
            resizing.bottomRight = true;
    });
});

document.addEventListener("mousemove", userResizeCanvas);
document.addEventListener("mouseup", () => {
    resizeCanvas(parseFloat(canvasContainer.style.width), parseFloat(canvasContainer.style.height));
    canvasContainer.classList.remove("outlined")
    resizing.bottom = false;
    resizing.right = false;
    resizing.bottomRight = false;
});

// Tools Buttons
penBtn.addEventListener("click", () => {
    unInitAll();
    initPenTool();
});

fillBtn.addEventListener("click", () => {
    unInitAll();
    initFillTool();
});

lineBtn.addEventListener("click", () => {
    unInitAll();
    initLineTool();
});

rectBtn.addEventListener("click", () => {
    unInitAll();
    initRectTool();
});

circleBtn.addEventListener("click", () => {
    unInitAll();
    initCircleTool();
});



// ====ctx.lineCap = "?";==========

// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(500 - canvas.getBoundingClientRect().left, 500 - canvas.getBoundingClientRect().top);
// ctx.stroke();

// console.log(500 - canvas.getBoundingClientRect().left, 500 - canvas.getBoundingClientRect().top);
// "circle, rectangle, square"