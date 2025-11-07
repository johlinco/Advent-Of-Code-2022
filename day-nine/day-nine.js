const { FORMERR } = require("dns");
const fs = require("fs");

const input = fs.readFileSync("day-nine/input.txt", "utf8");
const example = fs.readFileSync("day-nine/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)


/**
 * 
 * for each set of directions
 *      loop through directions and note head position and then move tail based on head if needed
 *          determining tail movement
                
 *      Add tail stringified tail position to set "hx,hy-tx,ty"
 *  
 */

function tailPositionReporter(directions) {
    let tailPositionSet = new Set()
    let hx = 0
    let hy = 0
    let tx = 0
    let ty = 0
    
    for (const row of directions) {
        const [dir, reps] = row.split(" ")
        // head moving
        for (let i = 0; i < reps; i++) {
            if (dir === "U") {
                hy++
            } else if (dir === "D") {
                hy--
            } else if (dir === "L") {
                hx--
            } else if (dir === "R") {
                hx++
            }

             // tail moving
        let yDiff = hy - ty
        let xDiff = hx - tx
        // up case hy - ty is 2 and hx - tx is 0
        if (yDiff === 2 &&  xDiff === 0) {
            ty++
        } else if (
            // up right case (hy - ty is 1 AND hx - tx is 2) OR (hy - ty is 2 AND hx - tx is 1)
            (yDiff === 1 && xDiff === 2) || (yDiff === 2 && xDiff === 1)
        ) {
            ty++
            tx++
        } else if (
            //right case hy - ty is 0 AND hx - tx is 2
            yDiff === 0 && xDiff === 2
        ) {
            tx++
        } else if (
             // down right case (hy - ty is -1 AND hx - tx is 2) OR (hy - ty is -2 AND hx - tx is 1)
             (yDiff === -1 && xDiff === 2) || (yDiff === -2 && xDiff === 1)
        ) {
            ty--
            tx++
        } else if (
            // down case hy - ty is -2 AND hx - tx is 0
            yDiff === -2 && xDiff === 0
        ) {
            ty--
        } else if (
            // down left case (hy - ty is -1 AND hx - tx is -2) OR (hy - ty is -2 AND hx - tx is -1)
            (yDiff === -1 && xDiff === -2) || (yDiff === -2 && xDiff === -1)
        ) {
            ty--
            tx--
        } else if (
            // left case hy - ty is 0 AND hx - tx is -2
            yDiff === 0 && xDiff === -2
        ) {
            tx--
        } else if (
            // up left case (hy - ty is 1 AND hx - tx is -2) OR (hy - ty is 2 AND hx - tx is -1)
            (yDiff === 1 && xDiff === -2) || (yDiff === 2 && xDiff === -1)
        ) { 
            tx--
            ty++
        }
        tailPositionSet.add(`${tx.toString()},${ty.toString()}`)
        // console.log('head', hx, hy)
        // console.log('tail', tx, ty)
        // console.log(`${tx.toString()},${ty.toString()}`)
        // console.log(tailPositionSet)
        }
    }

    return tailPositionSet.size
}
console.log(tailPositionReporter(exampleRows))
console.log(tailPositionReporter(inputRows))


