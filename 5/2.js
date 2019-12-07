const fs = require('fs')

const seed = 5
const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => +num)

numParams = {
    '1': 4,
    '2': 4,
    '3': 2,
    '4': 2,
    '5': 3,
    '6': 3,
    '7': 4,
    '8': 4,
}

let i = 0
while (i < input.length) {
    let command = [...(''+input[i]).padStart(5, '0')]
    let opCode = +(command[3] + command[4])

    let p1 = +(+command[2] ? input[i+1] : input[input[i+1]])
    let p2 = +(+command[1] ? input[i+2] : input[input[i+2]])
    let p3 = +(+command[0] ? input[i+3] : input[input[i+3]])

    let skipIncrement = false
    switch (opCode) {
        case 1:
            input[input[i+3]] = p1 + p2
            break;
        case 2:
            input[input[i+3]] = p1 * p2
            break;
        case 3:
            input[input[i+1]] = seed
            break;
        case 4:
            console.log('Output: ', input[input[i+1]])
            break;
        case 5:
            if (p1) {
                i = p2
                skipIncrement = true
            }
            break;
        case 6:
            if (!p1) {
                i = p2
                skipIncrement = true
            }
            break;
        case 7:
            input[input[i+3]] = p1 < p2 ? 1 : 0
            break;
        case 8:
            input[input[i+3]] = p1 === p2 ? 1 : 0
            break;
        case 99:
            i = input.length
            break;
        default:
            console.log('Syntax error')
            i = input.length
    }

    i = !skipIncrement ? i + (numParams[opCode] || input.length) : i
}
