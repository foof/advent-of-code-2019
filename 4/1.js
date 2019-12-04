const input = [134792, 675810]

const candidates = [...Array(input[1] - input[0] + 1).keys()]
    .map(i => i + input[0])
    .map(val => val.toString())
    .filter(val => val.split('').sort().join('') === val && (new Set([...val.split('')])).size !== val.split('').length)

console.log(candidates.length)