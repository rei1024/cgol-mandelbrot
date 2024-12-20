// @ts-check

import { WithSign } from "./WithSign.js";

const $canvas = document.querySelector("#canvas");
if (!($canvas instanceof HTMLCanvasElement)) {
    throw new Error('error')
}
const context = $canvas.getContext("2d", { alpha: false });
if (context == null) {
    throw new Error('error')
}

// as 1
// Must be a power of 2
const SIZE = 2 ** 6;
$canvas.width = SIZE * 4;
$canvas.height = SIZE * 4;
const ITERATION = 32;

const DIVERGE_LIMIT = 4n * BigInt(SIZE);

context.fillStyle = "white";
context.fillRect(0, 0, $canvas.width, $canvas.height);

context.fillStyle = "black";

const SIZE_BIGINT = BigInt(SIZE);
const SIZE_LOG2 = BigInt(Math.log2(SIZE)) // throws error then log2 is float

// B2DX, B2DY
let canvasX = 0;
let canvasY = 0;

let cx = new WithSign(SIZE_BIGINT * 2n, true);
let cy = new WithSign(SIZE_BIGINT * 2n, true);

// from -2 to 2
for (let _i = 0; _i < SIZE * 4; _i++) {
    for (let _j = 0; _j < SIZE * 4; _j++) {
        let diverge = false;
        let x = WithSign.zero();
        let y = WithSign.zero();

        for (let k = 0; k < ITERATION; k++) {
            let xSq = x;
            xSq = xSq.mul(x);
            xSq = xSq.rightShift(SIZE_LOG2)
            let ySq = y;
            ySq = ySq.mul(y);
            ySq = ySq.rightShift(SIZE_LOG2)
            // const xSqAddYSq = xSq.add(ySq)
            // // x^2 + y^2 > 4
            // if (xSqAddYSq.absGt(DIVERGE_LIMIT)) {
            //     diverge = true;
            //     break;
            // }
            if (xSq.absGt(DIVERGE_LIMIT) || ySq.absGt(DIVERGE_LIMIT)) {
                diverge = true;
                break;
            }
            const xTemp = xSq.sub(ySq).add(cx);
            // y = (2n * x * y) / SIZE_BIGINT + c_y;
            y = y.mul(x);
            y = y.mul(new WithSign(2n, false));
            y = y.rightShift(SIZE_LOG2);
            y = y.add(cy);
            x = xTemp;
        }

        if (!diverge) {
            context.rect(canvasX, canvasY, 1, 1);
            // context.fill();
            // await new Promise(resolve => setTimeout(resolve, 1))
        }
        canvasX += 1;
        cx = cx.succ();
    }

    cx = new WithSign(SIZE_BIGINT * 2n, true);
    cy = cy.succ();

    canvasX = 0;
    canvasY += 1;
}
context.fill();
