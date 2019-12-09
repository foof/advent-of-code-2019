const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')

let x = 25
let y = 6

let layer = input.match(new RegExp(`.{${x * y}}`, 'g'))
    .reverse()
    .map(layer => layer.split(''))
    .reduce((acc, layer) => acc.map((pixel, index) => ['0', '1'].includes(layer[index]) ? layer[index] : pixel))
    .join('')
    .match(new RegExp(`.{${x}}`, 'g'))
    .map(row => row.replace(/[02]/g, ' '))

console.log(layer)