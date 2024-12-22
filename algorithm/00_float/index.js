// @ts-check

export {}

const $canvas = document.querySelector("#canvas");
if (!($canvas instanceof HTMLCanvasElement)) {
    throw new Error('error')
}
const context = $canvas.getContext("2d", { alpha: false });
if (context == null) {
    throw new Error('error')
}

// as 1
const SIZE = 64;
$canvas.width = SIZE * 4;
$canvas.height = SIZE * 4;
const ITERATION = 64;

const DIVERGE_LIMIT = 4;

context.fillStyle = "white";
context.fillRect(0, 0, $canvas.width, $canvas.height);

context.fillStyle = "black";

// from -2 to 2
for (let i = -SIZE * 2; i < SIZE * 2; i++) {
    for (let j = -SIZE * 2; j < SIZE * 2; j++) {
        let diverge = false;
        let x = 0;
        let y = 0;
        const c_x = j / SIZE;
        const c_y = i / SIZE;

        for (let k = 0; k < ITERATION; k++) {
            const xSq = x * x;
            const ySq = y * y;
            // x^2 + y^2 > 4
            if ((xSq + ySq) > DIVERGE_LIMIT) {
                diverge = true;
                break;
            }
            const xTemp = xSq - ySq + c_x;
            y = (2 * x * y) + c_y;
            x = xTemp;
        }

        if (!diverge) {
            context.rect(j + SIZE * 2, i + SIZE * 2, 1, 1);
            // context.fill();
            // await new Promise(resolve => setTimeout(resolve, 1))
        }
    }

    context.fill();
}
