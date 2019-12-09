const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(num => +num)

function* intCodeProcessor(inst, phaseSettings, inputs, index) {
    let i = 0
    while (true) {
        let command = [...('' + inst[i]).padStart(5, '0')]
        let opCode = +(command[3] + command[4])

        let p1 = +(+command[2] ? inst[i + 1] : inst[inst[i + 1]])
        let p2 = +(+command[1] ? inst[i + 2] : inst[inst[i + 2]])
        let p3 = +(+command[0] ? inst[i + 3] : inst[inst[i + 3]])

        switch (opCode) {
            case 1:
                inst[inst[i + 3]] = p1 + p2
                i += 4
                break
            case 2:
                inst[inst[i + 3]] = p1 * p2
                i += 4
                break
            case 3:
                inst[inst[i + 1]] = i === 0 ? phaseSettings[index] : inputs[index]
                i += 2
                break
            case 4:
                yield p1
                i += 2
                break;
            case 5:
                i = p1 ? p2 : (i + 3)
                break
            case 6:
                i = !p1 ? p2 : (i + 3)
                break
            case 7:
                inst[inst[i + 3]] = p1 < p2 ? 1 : 0
                i += 4
                break
            case 8:
                inst[inst[i + 3]] = p1 === p2 ? 1 : 0
                i += 4
                break
            case 99:
                return
            default:
                console.log('Syntax error')
                return
        }
    }
}

function getFinalSignal(phaseSettings) {
    let inputs = Array.from('0'.repeat(phaseSettings.length)).map(input => +input)

    let amp0 = intCodeProcessor(input.slice(), phaseSettings, inputs, 0)
    let amp1 = intCodeProcessor(input.slice(), phaseSettings, inputs, 1)
    let amp2 = intCodeProcessor(input.slice(), phaseSettings, inputs, 2)
    let amp3 = intCodeProcessor(input.slice(), phaseSettings, inputs, 3)
    let amp4 = intCodeProcessor(input.slice(), phaseSettings, inputs, 4)

    for (let i0 of amp0) {
        inputs[1] = i0
        inputs[2] = amp1.next().value
        inputs[3] = amp2.next().value
        inputs[4] = amp3.next().value
        return amp4.next().value
    }
}

function generatePermutations(n, arr, res) {
    // If only 1 element, just output the array
    if (n == 1) {
        res.push(arr.slice())
        return
    }

    for (let i = 0; i < n; i += 1) {
        generatePermutations(n - 1, arr, res)

        // If n is even
        if (n % 2 == 0) {
            swap(arr, i, n - 1)
        } else {
            swap(arr, 0, n - 1)
        }
    }
}

function swap(arr, idxA, idxB) {
    let tmp = arr[idxA]
    arr[idxA] = arr[idxB]
    arr[idxB] = tmp
}

const set = [0, 1, 2, 3, 4]
const permutations = []
generatePermutations(set.length, set, permutations)

console.log(permutations.reduce((currMax, phaseSettings) => Math.max(currMax, getFinalSignal(phaseSettings)), 0))