export function trimNumber(num) {
    num = Number(num)
    let key = 2
    let isNegative = false

    if (num < 0) {
        num = (-num)
        isNegative = true
    }

    if (num < 1) {
        let rightSide = `${num}`.split('.')[1] //get right side of number

        if (rightSide?.length > 1) {
            rightSide = rightSide.split('')

            for (let i = 0; i < rightSide.length; i++) {
                if (rightSide[i] !== '0' && rightSide[i + 1] !== '0') {
                    key = i + 2
                    break
                }
            }
        }
    }

    num = +(num ? num.toFixed(key) : 0)

    if (isNegative) num = (-num)

    return num
}
