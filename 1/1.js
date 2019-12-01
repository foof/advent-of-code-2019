const fs = require('fs')

const inputRows = fs.readFileSync('./input.txt', 'utf8').split("\n")

const totalFuel = inputRows
    .map(mass => Math.floor(mass / 3) - 2)
    .reduce((acc, fuel) => acc + fuel, 0)

console.log(totalFuel)