/**
 * Calculate the percentage of `a` from `b`.
 *
 * @param {number} a - The part value.
 * @param {number} b - The whole value.
 * @returns {number} - The percentage of `a` from `b`.
 */
export function calculatePercentage(a: number, b: number): number {
    if (b === 0) {
        throw new Error("The value of 'b' cannot be zero.")
    }
    const res = (a / b) * 100
    const resFixed = parseFloat(res.toFixed(2))
    return resFixed
}
