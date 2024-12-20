/**
 *
 * @param {bigint} x
 * @param {boolean} xIsNegaitve
 * @param {bigint} y
 * @param {boolean} yIsNegative
 * @returns
 */
function addWithSign(x, xIsNegaitve, y, yIsNegative) {
    if (xIsNegaitve) {
        if (yIsNegative) {
            return {
                isNegative: true,
                value: x + y,
            }
        } else {
            if (x > y) {
                return {
                    isNegative: true,
                    value: x - y
                }
            } else {
                return {
                    isNegative: false,
                    value: y - x,
                }
            }
        }
    } else {
        if (yIsNegative) {
            if (x > y) {
                return {
                    isNegative: false,
                    value: x - y,
                }
            } else {
                return {
                    isNegative: true,
                    value: y - x
                }
            }
        } else {
            return {
                isNegative: false,
                value: x + y,
            }
        }
    }
}

export class WithSign {
    /**
     *
     * @param {bigint} value
     * @param {boolean} isNegative
     */
    constructor(value, isNegative) {
        if (typeof isNegative !== 'boolean') {
            throw new Error('Error')
        }
        if (value < 0n) {
            throw new Error('negative number');
        }
        if (value === 0n && isNegative) {
            isNegative = false;
        }
        /**
         * @private
         * @readonly
         */
        this.value = value;
        /**
         * @private
         * @readonly
         */
        this.isNegative = isNegative;
    }

    /** 0 */
    static zero() {
        return new WithSign(0n, false)
    }

    /**
     * this + other
     * @param {WithSign} other
     * @returns {WithSign}
     */
    add(other) {
        const out = addWithSign(this.value, this.isNegative, other.value, other.isNegative);
        return new WithSign(out.value, out.isNegative);
    }

    /**
     * this - other
     * @param {WithSign} other
     * @returns {WithSign}
     */
    sub(other) {
        return this.add(new WithSign(other.value, !other.isNegative))
    }

    /**
     * -this
     */
    negate() {
        return new WithSign(this.value, !this.isNegative);
    }

    /** +1 */
    succ() {
        return this.add(new WithSign(1n, false))
    }

    /**
     * this * other
     * @param {WithSign} other
     * @returns {WithSign}
     */
    mul(other) {
        return new WithSign(this.value * other.value, this.isNegative != other.isNegative)
    }

    /**
     * |this| > num
     * @param {bigint} num
     */
    absGt(num) {
        return this.value > num;
    }

    /**
     * this >> x
     * @param {bigint} x
     * @returns {WithSign}
     */
    rightShift(x) {
        return new WithSign(this.value >> x, this.isNegative)
    }

    /**
     * 
     * @returns {bigint}
     */
    asBigInt() {
        if (this.isNegative) {
            return -this.value;
        } else {
            return this.value
        }
    }
}
