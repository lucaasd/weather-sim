import GridElement, { ElementType } from "./data/GridElement";
import Vector2 from "./math/Vector2";

let gl: WebGLRenderingContext;
let grid = new Array<GridElement>();
let gridHeight: number = 0;
let gridWidth: number = 0;
let configSection: HTMLElement;
let simulationSection: HTMLElement;
let stopBtn: HTMLButtonElement;
let canvas: HTMLCanvasElement;

let quadBuffer: WebGLBuffer;

let elementVertexShaderSource: string;
let elementFragmentShaderSource: string;

let elementVertexShader: WebGLShader;
let elementFragmentShader: WebGLShader;

const quadMesh = new Float32Array([
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
    0.5, -0.5, 0.0
])


// Startup

function startup() {
    console.log("Script loaded with success");
    configureInputEvents();
    setupGlobalHTMLElements();
}

function configureInputEvents() {
    document.getElementById('gridWidthInput')!.addEventListener('input', updateGridWidth);
    document.getElementById('gridHeightInput')!.addEventListener('input', updateGridHeight);
    document.getElementById('startBtn')!.addEventListener('click', setupSimulation);
}

function setupGlobalHTMLElements() {
    configSection = document.getElementById('configSection')!;
    simulationSection = document.getElementById('gridSection')!;
    stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
}

// Simulation

function setupSimulation() {
    console.log("Initializing simulation");
    configSection.style.display = "none";
    setupWebGL();
    showStopButton();
    showSimulationSection();
    configureCanvasSize();
    setupGrid();
    fetchShaders().then();
    setupShaders();
    compileShaders();
    setupQuadBuffer();
    setupElementProgram();
    console.log("Simulation initialized with success");
}

async function fetchShaders() {
    console.log("Downloading shaders...")
    elementVertexShaderSource = await (await fetch('shaders/element.vert')).text();
    elementFragmentShaderSource = await (await fetch('shaders/element.frag')).text();
    console.log("Shaders downloaded with success");
}

function setupShaders() {
    console.log("Setting up shaders...");
    elementVertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    elementFragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

    gl.shaderSource(elementVertexShader, elementVertexShaderSource);
    gl.shaderSource(elementFragmentShader, elementFragmentShaderSource);
    console.log("Shaders set up with success");
}

function compileShaders() {
    console.log("Compiling shaders...");
    gl.compileShader(elementVertexShader);
    gl.compileShader(elementFragmentShader);
    console.log("Shaders compiled with success");
}

function setupElementProgram() {
    let elementProgram = gl.createProgram()!;
    gl.attachShader(elementProgram, elementVertexShader);
    gl.attachShader(elementProgram, elementFragmentShader);
    gl.linkProgram(elementProgram);
}


function setupQuadBuffer() {
    quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadMesh, gl.DYNAMIC_DRAW);
}

function setupGrid() {
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            let element = new GridElement(x, y);
            element.windSpeed = Vector2.random();
            x === 0 ? element.elementType = ElementType.Water : element.elementType = ElementType.Air;
            grid.push();
        }
    }
}

function renderGrid() {
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            let gridElement = grid.find(element => element.x === x && element.y === y);
            if (!gridElement) {
                continue;
            }

            if (gridElement.elementType === ElementType.Water) {

            }
        }
    }
}

function showStopButton() {
    stopBtn.style.display = "block";
}

function showSimulationSection() {
    simulationSection.style.display = "block";
}

function configureCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function setupWebGL() {
    let glContext = canvas.getContext('webgl');

    if (!glContext) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    gl = glContext;

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    } else {
        console.log("WebGL initialized with success");
    }

    update();
}

function update() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(update)
}

// Initial config event handlers

function updateGridWidth() {
    gridWidth = parseInt((document.getElementById('gridWidthInput')! as HTMLInputElement).value);
    document.getElementById('gridWidthValue')!.innerText = gridWidth.toString();
}

function updateGridHeight() {
    gridHeight = parseInt((document.getElementById('gridHeightInput')! as HTMLInputElement).value);
    document.getElementById('gridHeightValue')!.innerText = gridHeight.toString();
}


startup();