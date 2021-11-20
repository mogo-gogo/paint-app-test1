let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let filling = false
let fillColor = [255, 255, 0, 255]; // placeholder

function matchStartColor(pixelIndex, imageData, startPixelColor) {
    return (
        imageData.data[pixelIndex + 0] === startPixelColor[0] &&
        imageData.data[pixelIndex + 1] === startPixelColor[1] &&
        imageData.data[pixelIndex + 2] === startPixelColor[2] &&
        imageData.data[pixelIndex + 3] === startPixelColor[3]
    );
}

function changePixelColor(pixelIndex, imageDate) {
    imageDate.data[pixelIndex] = fillColor[0];
    imageDate.data[pixelIndex + 1] = fillColor[1];
    imageDate.data[pixelIndex + 2] = fillColor[2];
    imageDate.data[pixelIndex + 3] = fillColor[3];
}

function floodFill(e) {
    if (filling) return;
    filling = true;
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let startPixelPosition = { X: e.x - canvas.getBoundingClientRect().left, Y: e.y - canvas.getBoundingClientRect().top };
    let pixelIndex = (startPixelPosition.Y * canvas.width + startPixelPosition.X) * 4;
    let startPixelColor = [
        imageData.data[pixelIndex + 0],
        imageData.data[pixelIndex + 1],
        imageData.data[pixelIndex + 2],
        imageData.data[pixelIndex + 3]
    ];
    if (startPixelColor[0] === fillColor[0] &&
        startPixelColor[1] === fillColor[1] &&
        startPixelColor[2] === fillColor[2] &&
        startPixelColor[3] === fillColor[3]
    ) {
        filling = false;
        return;
    }
    let pixelStack = [startPixelPosition];
    while (pixelStack.length) {
        let curPixel, leftHead = false, rightHead = false;
        curPixel = pixelStack.pop();
        let x = curPixel.X, y = curPixel.Y;
        pixelIndex = (y * canvas.width + x) * 4;
        while (y-- >= 0, matchStartColor(pixelIndex, imageData, startPixelColor)) {
            pixelIndex -= canvas.width * 4;
        }
        pixelIndex += canvas.width * 4;
        y++;
        while (y++ < canvas.height && matchStartColor(pixelIndex, imageData, startPixelColor)) {
            changePixelColor(pixelIndex, imageData);
            if (x > 0) {
                if (matchStartColor(pixelIndex - 4, imageData, startPixelColor) && !leftHead) {
                    pixelStack.push({ X: x - 1, Y: y })
                    leftHead = true;
                }
                else {
                    leftHead = false;
                }
            }
            if (x < canvas.width) {
                if (matchStartColor(pixelIndex + 4, imageData, startPixelColor) && !rightHead) {
                    pixelStack.push({ X: x + 1, Y: y })
                    rightHead = true;
                }
                else {
                    rightHead = false;
                }
            }
            pixelIndex += canvas.width * 4;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    filling = false;
}

export function initFillTool() {
    canvas.addEventListener("click", floodFill);
}

export function unInitFillTool() {
    canvas.removeEventListener("click", floodFill);
}
