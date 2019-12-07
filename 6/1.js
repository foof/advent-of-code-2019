const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

nodes = input.map(orbit => orbit.split(')'))
    .reduce((acc, orbit) => {
        acc[orbit[1]] = orbit[0]
        return acc
    }, {});

result = Object.keys(nodes).reduce((count, node) => {
    count++
    for (let parent = nodes[node]; parent !== 'COM'; parent = nodes[parent]) {
        count++
    }
    return count
}, 0)

console.log(result)