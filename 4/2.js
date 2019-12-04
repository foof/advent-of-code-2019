const input = [134792, 675810]

const candidates = [...Array(input[1] - input[0] + 1).keys()]
    .map(i => i + input[0])
    .map(val => val.toString())
    .filter(val => val.split('').sort().join('') === val && (new Set([...val.split('')])).size !== val.split('').length)
    .filter(val => {
        for (let i = 1; i <= 9; i++) {
            const match = val.match(new RegExp(i.toString(), 'g'))
            if (match && match.length === 2) {
                return true
            }
        }
        return false
    })

console.log(candidates.length)