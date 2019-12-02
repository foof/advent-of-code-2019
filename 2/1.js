const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => parseInt(num))

for (let i = 0; i < input.length; i += 4) {
    switch (input[i]) {
        case 1:
            input[input[i+3]] = input[input[i+1]] + input[input[i+2]]
            break;
        case 2:
            input[input[i+3]] = input[input[i+1]] * input[input[i+2]]
            break;
        case 99:
            console.log(input[0])
            i = input.length
            break;
        default:
            console.log('Syntax error')
            i = input.length
    }
}
