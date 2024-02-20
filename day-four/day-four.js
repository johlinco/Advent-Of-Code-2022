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
        let first = set[0].split(" ")
        let last = set[1].split(" ")

        let firstFirst = parseInt(first[0])
        let firstLast = parseInt(first[1])
        let lastFirst = parseInt(last[0])
        let lastLast = parseInt(last[1])

        if (firstFirst >= lastFirst && firstLast <= lastLast) {
            count++
        } else if (lastFirst >= firstFirst && lastLast <= firstLast) {
            count++
        }
    }
   
    return count
}

function countOverlappingSets(sets) {
    let count = 0
    sets = sets.split(/\r?\n/)
    console.log(sets)

    for (let set of sets) {
        set = set.replace(/-/g, ' ')
        set = set.split(",")
        let first = set[0].split(" ")
        let last = set[1].split(" ")

        let firstFirst = parseInt(first[0])
        let firstLast = parseInt(first[1])
        let lastFirst = parseInt(last[0])
        let lastLast = parseInt(last[1])

        if (firstFirst <= lastFirst && firstLast >= lastFirst) {
            console.log(firstFirst, firstLast, lastFirst, lastLast)
            count++
        } else if (lastFirst <= firstFirst && lastLast >= firstFirst) {
            console.log(firstFirst, firstLast, lastFirst, lastLast)
            count++
        }
    }
   
    return count
}

// console.log(countEnveloppingSets(example))
// console.log(countEnveloppingSets(input))
console.log(countOverlappingSets(example))
console.log(countOverlappingSets(input))