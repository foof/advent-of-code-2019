const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => parseInt(num))

function program(input, noun, verb) {
    input[1] = noun
    input[2] = verb

    for (let i = 0; i < input.length; i += 4) {
        switch (input[i]) {
            case 1:
                input[input[i+3]] = input[input[i+1]] + input[input[i+2]]
                break;
            case 2:
                input[input[i+3]] = input[input[i+1]] * input[input[i+2]]
                break;
            case 99:
                return input[0]
            default:
                console.log('Syntax error')
                return
        }
    }
}

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        const result = program(input.slice(0), i, j)
        if (result === 19690720) {
            console.log('Noun: ', i)
            console.log('Verb: ', j)
            console.log('Result: ', 100 * i + j)
            process.exit()
        }
    }
}