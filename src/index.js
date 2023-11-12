// define globals
const scene = document.getElementById("scene");
const cursor = document.getElementById("cursor");
const camera = document.getElementById("camera");
const pov = document.getElementById("pov");
const fov = 30;
const far = 500;
let cursorX = 0;
let cursorY = 0;
let cameraX = 0;
let cameraY = 0;
let centerX = 0;
let centerY = 0;
let newLine = undefined;


// define functions
function resize() {
    const box = scene.getClientRects()[0];
    centerX = (box.left + box.right) / 2;
    centerY = (box.top + box.bottom) / 2;
}

function project() {

}

function mousemove(mouse) {
    cursorX = mouse.clientX - centerX;
    cursorY = mouse.clientY - centerY;
    cursor.setAttribute("cx", cursorX);
    cursor.setAttribute("cy", cursorY);
    if (newLine) {
        newLine.setAttribute('x2', cursorX);
        newLine.setAttribute('y2', cursorY);
    }
    project();
}

function mousedown(mouse) {
    cursorX = mouse.clientX - centerX;
    cursorY = mouse.clientY - centerY;
    newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttribute('x1', cursorX);
    newLine.setAttribute('y1', cursorY);
    newLine.setAttribute('x2', cursorX);
    newLine.setAttribute('y2', cursorY);
    newLine.setAttribute("stroke", "grey")
    newLine.setAttribute("stroke-width", 1);
    scene.appendChild(newLine);
    scene.onmousedown = undefined;
    scene.onmouseup = mouseup;
}

function mouseup(mouse) {
    cursorX = mouse.clientX - centerX;
    cursorY = mouse.clientY - centerY;
    scene.onmouseup = undefined;
    scene.onmousedown = mousedown;
    newLine.setAttribute('x2', cursorX);
    newLine.setAttribute('y2', cursorY);
    newLine.setAttribute("stroke", "orange")
    newLine.setAttribute("stroke-width", 3);
    newLine = undefined;
}


// add event listeners
window.onresize = resize;
scene.onmousemove = mousemove;
scene.onmousedown = mousedown;
scene.onmouseup = mouseup;


// main
resize();