
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const example = fs.readFileSync("example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

const signalStrength = (directions) => {
    const strengthUpdater = () => {
        if ((cycle + 20) % 40 === 0) {
            console.log("cycle is: ", cycle, "x is: ", x, "Adding", x * cycle, " to sum.")
            signalSum += x * cycle
        }
    }

    let x = 1
    let cycle = 0
    let signalSum = 0
    for (const row of directions) {
        if (row === "noop") {
            cycle++
            strengthUpdater()
        } else if (row.split(" ")[0] === "addx") {
            cycle++
            strengthUpdater()
            cycle++
            strengthUpdater()
            x += parseInt(row.split(" ")[1])
        } else {
            console.log("HERES SOMETHING WEIRD, ", row)
        }
        if (cycle > 220) break
    }
    return signalSum
}

console.log(signalStrength(exampleRows))
console.log(signalStrength(inputRows))