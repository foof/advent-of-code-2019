const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')

let x = 25
let y = 6
let layer = input.match(new RegExp(`.{${x * y}}`, 'g'))
    .reduce((currLayer, layer) => (currLayer.match(/0/g) || []).length < (layer.match(/0/g) || []).length ? currLayer : layer)

console.log(layer.match(/1/g).length * layer.match(/2/g).length)