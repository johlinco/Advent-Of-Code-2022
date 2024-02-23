const fs = require("fs");

const input = fs.readFileSync("day-five/input.txt", "utf8");
const example = fs.readFileSync("day-five/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

function findStackCountRow(rows) {
    let i = 0
    while (rows[i][1] !== '1') {
        i++
    }
    return i
}

function stacksBuilder(rows, stackCountRow) {
    let stacks = []

    for (let i = 1; i < rows[stackCountRow].length; i += 4) {
        stacks.push([])
    }

    for (let i = 0; i < stacks.length; i++) {
        let col = i*4 + 1
        let row = stackCountRow - 1
        while (row >= 0 && rows[row][col] !== " ") {
            stacks[i].push(rows[row][col])
            row--
        }
    }
    return stacks
}

function getMoves(row) {
    // get integer values of # of items to MOVE and stacks that items
    // are moving TO and FROM (subtracting 1 from TO and FROM values
    // to get to 0 based array positions)
    if (row[6] === " ") {
        var move = parseInt(row[5])
        var from = parseInt(row[12]) - 1
        var to = parseInt(row[17]) - 1
    } else {
        var move = parseInt(row[5]+row[6])
        var from = parseInt(row[13]) - 1
        var to = parseInt(row[18]) - 1
    }
    return [move, from, to]
}

function topOfStacksReader(stacks) {
    let finalString = ""
    for (const stack of stacks) {
        finalString = finalString + stack.pop()
    }
    return finalString
}

function getTopOfStacks9000(rows) {
    const stackCountRow = findStackCountRow(rows)
    const stacks = stacksBuilder(rows, stackCountRow)

    // iterate through commands
    for (let i  = stackCountRow + 2; i < rows.length; i++) {
        let row = rows[i]
        var [move, from, to] = getMoves(row)

        // execute moves pop and push individually
        for (let i = move; i > 0; i--) {
            let movingValue = stacks[from].pop()
            stacks[to].push(movingValue)
        }
    }

    return topOfStacksReader(stacks)
}

function getTopOfStacks9001(rows) {
    const stackCountRow = findStackCountRow(rows)
    const stacks = stacksBuilder(rows, stackCountRow)

    // iterate through commands
    for (let i  = stackCountRow + 2; i < rows.length; i++) {
        let row = rows[i]
        var [move, from, to] = getMoves(row)
        var holdingArray = []

        // execute moves pop into secondary stack
        for (let i = move; i > 0; i--) {
            let movingValue = stacks[from].pop()
            holdingArray.push(movingValue)
        }
        // moves from secondary stack to final stack
        while (holdingArray.length) {
            movingValue = holdingArray.pop()
            stacks[to].push(movingValue)
        }
    }

    return topOfStacksReader(stacks)
}


console.log(getTopOfStacks9000(exampleRows))
console.log(getTopOfStacks9000(inputRows))
console.log(getTopOfStacks9001(exampleRows))
console.log(getTopOfStacks9001(inputRows))
