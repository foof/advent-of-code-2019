const input = [134792, 675810]

const candidates = [...Array(input[1] - input[0] + 1).keys()]
    .map(i => (i + input[0]).toString())
    .filter(val =>
        val.split('').sort().join('') === val &&
        (new Set([...val.split('')])).size !== val.split('').length &&
        /(.)\1/.test(val.replace(/(.)\1{2,}/g,''))
    )

console.log(candidates.length)