const fs = require('fs')

const inputRows = fs.readFileSync('./input.txt', 'utf8').split("\n")

const totalFuel = inputRows
    .map(mass => Math.floor(mass / 3) - 2)
    .map(fuel => {
        let totalFuel = fuel
        do {
            fuel = Math.floor(fuel / 3) - 2
            totalFuel += Math.max(fuel, 0)
        } while (fuel > 0)
        return totalFuel
    })
    .reduce((acc, fuel) => acc + fuel, 0)

console.log(totalFuel)