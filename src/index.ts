import GridElement from "./data/GridElement";

let gl: WebGLRenderingContext;
let grid = new Array<GridElement>();
let gridHeight: number = 0;
let gridWidth: number = 0;

function startup() {
    console.log("Initializing simulation");
    setupWebGL();
    configureInputEvents();
}

function configureInputEvents() {
    document.getElementById('gridWidthInput')!.addEventListener('input', updateGridWidth);
    document.getElementById('gridHeightInput')!.addEventListener('input', updateGridHeight);
}

function setupWebGL() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    gl = canvas.getContext('webgl') as WebGLRenderingContext;

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    update();
}

function update() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(update)
}

function updateGridWidth() {
    gridWidth = parseInt((document.getElementById('gridWidthInput')! as HTMLInputElement).value);
    document.getElementById('gridWidthValue')!.innerText = gridWidth.toString();
}

function updateGridHeight() {
    gridHeight = parseInt((document.getElementById('gridHeightInput')! as HTMLInputElement).value);
    document.getElementById('gridHeightValue')!.innerText = gridHeight.toString();
}

startup();