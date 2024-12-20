```ts
        for (let k = 0; k < ITERATION; k++) {
            // len(x) = n
            // len(y) = m
            let xSq = x;
            xSq = xSq.mul(x);
            let ySq = y;
            ySq = ySq.mul(y);
            xSq = xSq.rightShift(SIZE_LOG2)
            ySq = ySq.rightShift(SIZE_LOG2)
            // len(xSq) = 2n - SIZE_LOG2
            // len(ySq) = 2m - SIZE_LOG2
            // len(xSqAddYSq) = (2n + 2m) - SIZE_LOG2 * 2
            const xSqAddYSq = xSq.add(ySq)
            // x^2 + y^2 > 4
            if (xSqAddYSq.absGt(DIVERGE_LIMIT)) {
                diverge = true;
                break;
            }
            // len(newX) = max(len(xSq), len(ySq)) + 1 + len(cx)
            // len(newX) = max(2n - SIZE_LOG2, 2m - SIZE_LOG2) + 1 + len(cx)
            // len(newX) = 2 * max(n, m) - SIZE_LOG2 + 1 + len(cx)
            // len(newY) = len(x) + len(y) + 1 - SIZE_LOG2 + len(cy)
            // n = m
            // len(newX) = 2n - SIZE_LOG2 + 1 + len(cx)
            // len(newY) = 2n + 1 - SIZE_LOG2 + len(cy)
            const xTemp = xSq.sub(ySq).add(cx);
            // y = (2n * x * y) / SIZE_BIGINT + c_y;
            y = y.mul(x);
            y = y.mul(new WithSign(2n, false));
            y = y.rightShift(SIZE_LOG2);
            y = y.add(cy);
            x = xTemp;
        }
```