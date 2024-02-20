const fs = require("fs");

const input = fs.readFileSync("day-five/input.txt", "utf8");
const example = fs.readFileSync("day-five/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)

function getTopOfStacks(rows) {
    // find stack count row
    let i = 0
    while (rows[i][1] !== '1') {
        i++
    }
    const stackCountRow = i

    // initialize stacks
    const stacks = []

    for (let i = 1; i<rows[stackCountRow].length; i += 4) {
        stacks.push([])
    }

    // build stacks
    for (let i = 0; i < stacks.length; i++) {
        let col = i*4 + 1
        let row = stackCountRow -1
        while (row >= 0 && rows[row][col] !== " ") {
            stacks[i].push(rows[row][col])
            row--
        }
    }
    return stacks[2]
}



console.log(getTopOfStacks(exampleRows))
