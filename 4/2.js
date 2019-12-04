const input = [134792, 675810]

const candidates = [...Array(input[1] - input[0] + 1).keys()]
    .map(i => (i + input[0]).toString())
    .filter(val => val.split('').sort().join('') === val && (new Set([...val.split('')])).size !== val.split('').length && [...Array(10).keys()].filter(digit => val.match(new RegExp(digit, 'g')) && val.match(new RegExp(digit, 'g')).length == 2).length)

console.log(candidates.length)