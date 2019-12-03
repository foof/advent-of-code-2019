const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

const wireOneInstructions = input[0].split(',')
const wireTwoInstructions = input[1].split(',')

function getNodes(instructions)
{
    let x = 0
    let y = 0

    return instructions.reduce((nodes, instruction) => {
        const direction = instruction.split('')[0]
        const distance = parseInt(instruction.substring(1))
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case 'U': y++; break
                case 'R': x++; break
                case 'D': y--; break
                case 'L': x--; break
            }
            nodes.add(`${x},${y}`)
        }
        return nodes
    }, new Set())
}

const wireOneNodes = getNodes(wireOneInstructions)
const wireTwoNodes = getNodes(wireTwoInstructions)
const intersections = new Set([...wireOneNodes].filter(node => wireTwoNodes.has(node)));

const closestIntersection = [...intersections].reduce((minDistance, node) => {
    const coords = node.split(',')
    const manhattanDistance = Math.abs(coords[0]) + Math.abs(coords[1])

    return (!minDistance || manhattanDistance < minDistance) ? manhattanDistance : minDistance
}, false)

console.log(closestIntersection)