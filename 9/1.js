const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').padEnd().split(',').map(num => +num)

function getAddress(memory, pos, mode, relativeBase) {
    switch (+mode) {
        case 0:
            return memory[pos] || 0
        case 1:
            return pos
        case 2:
            return (memory[pos] || 0) + relativeBase
    }
}

function* intCodeProcessor(memory, input) {
    let i = 0
    let relativeBase = 0
    while (true) {
        let command = [...('' + memory[i]).padStart(5, '0')]
        let opCode = +(command[3] + command[4])

        let addr1 = getAddress(memory, i + 1, command[2], relativeBase)
        let addr2 = getAddress(memory, i + 2, command[1], relativeBase)
        let addr3 = getAddress(memory, i + 3, command[0], relativeBase)

        let val1 = memory[addr1] || 0
        let val2 = memory[addr2] || 0
        let val3 = memory[addr3] || 0

        switch (opCode) {
            case 1:
                memory[addr3] = val1 + val2
                i += 4
                break
            case 2:
                memory[addr3] = val1 * val2
                i += 4
                break
            case 3:
                memory[addr1] = input
                i += 2
                break
            case 4:
                yield val1
                i += 2
                break;
            case 5:
                i = val1 ? val2 : (i + 3)
                break
            case 6:
                i = !val1 ? val2 : (i + 3)
                break
            case 7:
                memory[addr3] = val1 < val2 ? 1 : 0
                i += 4
                break
            case 8:
                memory[addr3] = val1 === val2 ? 1 : 0
                i += 4
                break
            case 9:
                relativeBase += val1
                i += 2
                break
            case 99:
                console.log('HALT')
                return
            default:
                console.log('Syntax error')
                return
        }
    }
}

let cpu = intCodeProcessor(input, 1)

for (output of cpu) {
    console.log('--------- OUTPUT --------')
    console.log(output)
}