const tapir = document.querySelector(".tapir");
const barra = document.querySelector(".barra__progreso");
const porcentaje = document.querySelector(".porcentaje");

const FRAME_WIDTH = 384;
const FRAME_HEIGHT = 512;
const COLUMNS = 4;
const TARGET_CENTER_X = 192;
const TARGET_BOTTOM_Y = 236;

const idleAnimation = [
    0,
    0,
    1,
    1,
    2,
    3,
    4,
    4,
    5,
    6,
    6,
    7,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    0,
];

const frameBounds = [
    { left: 48, right: 366, bottom: 472 },
    { left: 51, right: 357, bottom: 473 },
    { left: 39, right: 351, bottom: 475 },
    { left: 14, right: 340, bottom: 476 },
    { left: 67, right: 367, bottom: 317 },
    { left: 27, right: 356, bottom: 319 },
    { left: 24, right: 347, bottom: 319 },
    { left: 14, right: 330, bottom: 317 },
];

let currentFrame = 0;
let lastFrameTime = 0;
let progress = 0;

function mostrarFrame(frame) {
    const columna = frame % COLUMNS;
    const fila = Math.floor(frame / COLUMNS);
    const bounds = frameBounds[frame];
    const centerX = (bounds.left + bounds.right) / 2;
    const offsetX = TARGET_CENTER_X - centerX;
    const offsetY = TARGET_BOTTOM_Y - bounds.bottom;

    tapir.style.backgroundPosition =
        `${-(columna * FRAME_WIDTH) + offsetX}px ${-(fila * FRAME_HEIGHT) + offsetY}px`;
}

function actualizarCarga() {
    progress = Math.min(progress + Math.random() * 7 + 2, 100);

    const valor = Math.round(progress);
    barra.style.width = `${valor}%`;
    porcentaje.textContent = `${valor}%`;

    if (valor < 100) {
        window.setTimeout(actualizarCarga, 180);
    }
}

function animar(timestamp) {
    if (timestamp - lastFrameTime > 130) {
        mostrarFrame(idleAnimation[currentFrame]);
        currentFrame = (currentFrame + 1) % idleAnimation.length;
        lastFrameTime = timestamp;
    }

    requestAnimationFrame(animar);
}

mostrarFrame(0);
actualizarCarga();
requestAnimationFrame(animar);
