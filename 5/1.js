const fs = require('fs')

const seed = 1
const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => +num)

instructionLengths = {
    '1': 4,
    '2': 4,
    '3': 2,
    '4': 2,
    '99': 0,
}

for (let i = 0; i < input.length; i += instructionLengths[[...''+input[i]].slice(-1)[0]]) {
    let command = [...(''+input[i]).padStart(5, '0')]
    let opCode = +(command[3]+command[4])

    switch (opCode) {
        case 1:
            input[input[i+3]] = (+command[2] ? input[i+1] : input[input[i+1]]) + (+command[1] ? input[i+2] : input[input[i+2]])
            break;
        case 2:
            input[input[i+3]] = (+command[2] ? input[i+1] : input[input[i+1]]) * (+command[1] ? input[i+2] : input[input[i+2]])
            break;
        case 3:
            input[input[i+1]] = seed
            break;
        case 4:
            console.log('Output: ', input[input[i+1]])
            break;
        case 99:
            i = input.length
            break;
        default:
            console.log('Syntax error')
            i = input.length
    }
}
