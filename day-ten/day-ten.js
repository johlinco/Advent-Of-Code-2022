
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


/**
 * 
 * for each cycle i need to check if the current x position has a pixel in it in the sprite row and then put put a pixel there  if it does.
 * after every twenty cycles, I add that row to the CRT.
 * 
 * 
 */
const CRTDrawer = (directions, height, width) => {

    const rowDrawer = (startingPos) => {
        let row = new Array(width).fill(".")
        for (let i = startingPos; i < startingPos + width; i++) {
            if (spriteMatches.has(i)) {
                row[i - (width * Math.floor(i / width))] = "#"
            }
        }
        CRT.push(row)
    }

    const spriteMatchPusher = () => {
        const numCheck = cycle - (width * Math.floor(cycle / width))
        if (numCheck <= spritePos + 1 && numCheck >= spritePos - 1) {
            spriteMatches.add(cycle)
        }
    }
    let spritePos = 1
    let cycle = -1
    let spriteMatches = new Set()
    let CRT = []
    for (const row of directions) {
        if (row === "noop") {
            cycle++
            spriteMatchPusher()
        } else if (row.split(" ")[0] === "addx") {
            cycle++
            spriteMatchPusher()
            cycle++
            spriteMatchPusher()
            spritePos += parseInt(row.split(" ")[1])
        } 
    }
    for (let i = 0; i < height; i++) {
        rowDrawer(i*width)
    }

    return CRT.map(row => row.join("")).join("\n")
}

console.log(signalStrength(exampleRows))

console.log(signalStrength(inputRows))

console.log(CRTDrawer(exampleRows, 6, 40))
console.log(CRTDrawer(inputRows, 6, 40))