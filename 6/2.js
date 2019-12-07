const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

nodes = input.map(orbit => orbit.split(')'))
    .reduce((acc, orbit) => {
        acc[orbit[1]] = orbit[0]
        return acc
    }, {});

function distanceToParentNode(n1, n2, nodes) {
    if (n1 === n2) {
        return 0
    }

    let parent = nodes[n1]
    let count = 1
    while (parent !== n2) {
        count++
        parent = nodes[parent]
    }
    if (parent === 'COM' && n2 !== 'COM') {
        return -1
    }
    return count
}

function getParents(node, nodes) {
    const parents = []
    let parent = nodes[node]
    do {
        parents.push(parent)
        parent = parent !== 'COM' ? nodes[parent] : parent
    } while (parent !== 'COM')
    return parents
}

myParents = getParents('YOU', nodes)

let closestParent = nodes['SAN']
while (!myParents.includes(closestParent)) {
    closestParent = nodes[closestParent]
}

console.log(distanceToParentNode(nodes['SAN'], closestParent, nodes) + distanceToParentNode(nodes['YOU'], closestParent, nodes))