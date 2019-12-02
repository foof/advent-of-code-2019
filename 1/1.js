const fs = require('fs')

const inputRows = fs.readFileSync('./input.txt', 'utf8').split("\n")

const totalFuel = inputRows.reduce((acc, fuel) => Math.floor(fuel / 3) - 2, 0)

console.log(totalFuel)
