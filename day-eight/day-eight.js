const { FORMERR } = require("dns");
const fs = require("fs");

const input = fs.readFileSync("day-eight/input.txt", "utf8");
const example = fs.readFileSync("day-eight/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

function isEdge(forest, row, col) {
    return row === 0 || row === forest.length - 1 || col === 0 || col === forest[0].length -1 
}

function clearUp(forest, row, col) {
    let currentTree = parseInt(forest[row][col])
    let checkRow = row - 1
    while (currentTree > parseInt(forest[checkRow][col])) {
        if (checkRow === 0) {
            return true
        }
        checkRow--
    }
    return false
}

function clearDown(forest, row, col) {
    let currentTree = parseInt(forest[row][col])
    let checkRow = row + 1
    while (currentTree > parseInt(forest[checkRow][col])) {
        if (checkRow === forest.length-1) {
            return true
        }
        checkRow++
    }
}

function clearRight(forest, row, col) {
    let currentTree = parseInt(forest[row][col])
    let checkCol = col + 1
    while (currentTree > parseInt(forest[row][checkCol])) {
        if (checkCol === forest[row].length-1) {
            return true
        }
        checkCol++
    }
}

function clearLeft(forest, row, col) {
    let currentTree = parseInt(forest[row][col])
    let checkCol = col - 1
    while (currentTree > parseInt(forest[row][checkCol])) {
        if (checkCol === 0) {
            return true
        } 
        checkCol--
    }
}

function findVisibleTrees(forest) {

    let visibleTrees = 0

    for (let row = 0; row < forest.length; row ++) {
        for (let col = 0; col < forest[0].length; col++) {
            
            if (isEdge(forest, row, col)) {
                visibleTrees++
                continue
            } else {
                visibleTrees += (clearUp(forest, row, col) || clearDown(forest, row, col) || clearRight(forest, row, col) || clearLeft(forest, row, col)) ? 1 : 0
            } 
        }
    }

    

 
 return visibleTrees

}

console.log(findVisibleTrees(inputRows))