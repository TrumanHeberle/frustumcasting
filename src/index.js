// define globals
const scene = document.getElementById("scene");
const cursor = document.getElementById("cursor");
let centerX = 0;
let centerY = 0;
let newLine = undefined;


// define functions
function resize() {
    const box = scene.getClientRects()[0];
    centerX = (box.left + box.right) / 2;
    centerY = (box.top + box.bottom) / 2;
}

function mousemove(mouse) {
    const x = mouse.clientX - centerX;
    const y = mouse.clientY - centerY;
    cursor.setAttribute("cx", x);
    cursor.setAttribute("cy", y);
    if (newLine) {
        newLine.setAttribute('x2', x);
        newLine.setAttribute('y2', y);
    }
    project();
}

function mousedown(mouse) {
    const x = mouse.clientX - centerX;
    const y = mouse.clientY - centerY;
    newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttribute('x1', x);
    newLine.setAttribute('y1', y);
    newLine.setAttribute('x2', x);
    newLine.setAttribute('y2', y);
    newLine.setAttribute("stroke", "grey")
    newLine.setAttribute("stroke-width", 1);
    scene.appendChild(newLine);
    scene.onmousedown = undefined;
    scene.onmouseup = mouseup;
}

function mouseup(mouse) {
    const x = mouse.clientX - centerX;
    const y = mouse.clientY - centerY;
    scene.onmouseup = undefined;
    scene.onmousedown = mousedown;
    newLine.setAttribute('x2', x);
    newLine.setAttribute('y2', y);
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