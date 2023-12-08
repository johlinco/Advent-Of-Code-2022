const fs = require("fs");

const input = fs.readFileSync("day-four/input.txt", "utf8");
const example = fs.readFileSync("day-four/example.txt", "utf8");

function countEnveloppingSets(sets) {
    let count = 0
    sets = sets.split(/\r?\n/)
    console.log(sets)

    for (let set of sets) {
        set = set.replace(/-/g, ' ')
        set = set.split(",")
        let firstFirst = parseInt(set[0][0])
        let firstLast = parseInt(set[0][2])
        let lastFirst = parseInt(set[1][0])
        let lastLast = parseInt(set[1][2])
        console.log(firstFirst, firstLast, lastFirst, lastLast)
        if (firstFirst >= lastFirst && firstLast <= lastLast) {
            console.log(firstFirst, firstFirst, lastFirst, lastLast)
            console.log('here)')
            count++
        }
        if (lastFirst >= firstFirst && lastLast <= firstLast) {
            console.log(firstFirst, firstFirst, lastFirst, lastLast)
            console.log('here')
            count++
        }
    }
   
    return count
}

console.log(countEnveloppingSets(example))
console.log(countEnveloppingSets(input))
