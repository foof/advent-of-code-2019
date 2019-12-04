const input = [134792, 675810]

const candidates = [...Array(input[1] - input[0] + 1).keys()]
    .map(i => (i + input[0]).toString())
    .filter(val =>
        val.split('').sort().join('') === val &&
        (new Set([...val.split('')])).size !== val.split('').length &&
        /(?<!1)1{2}(?!1)|(?<!2)2{2}(?!2)|(?<!3)3{2}(?!3)|(?<!4)4{2}(?!4)|(?<!5)5{2}(?!5)|(?<!6)6{2}(?!6)|(?<!7)7{2}(?!7)|(?<!8)8{2}(?!8)|(?<!9)9{2}(?!9)/.test(val)
    )

console.log(candidates.length)