const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

const wireOneInstructions = input[0].split(',')
const wireTwoInstructions = input[1].split(',')

function getNodes(instructions)
{
    let x = 0
    let y = 0
    let steps = 0

    return instructions.reduce((nodeData, instruction) => {
        const direction = instruction.split('')[0]
        const distance = parseInt(instruction.substring(1))
        for (let i = 0; i < distance; i++) {
            steps++
            switch (direction) {
                case 'U': y++; break
                case 'R': x++; break
                case 'D': y--; break
                case 'L': x--; break
            }
            nodeData.nodes.add(`${x},${y}`)
            if (!nodeData.coordSteps[`${x},${y}`]) {
                nodeData.coordSteps[`${x},${y}`] = steps
            }
        }

        return nodeData
    }, { nodes: new Set(), coordSteps: {} })
}

const wireOneNodeData = getNodes(wireOneInstructions)
const wireTwoNodeData = getNodes(wireTwoInstructions)
const intersections = new Set([...wireOneNodeData.nodes].filter(node => wireTwoNodeData.nodes.has(node)));

const intersectionWithLeastCombinedSteps = [...intersections].reduce((intersection, node) => {
    const steps = wireOneNodeData.coordSteps[node] + wireTwoNodeData.coordSteps[node]

    return (!intersection || intersection.steps > steps) ? { node, steps } : intersection
}, undefined)

console.log(intersectionWithLeastCombinedSteps)