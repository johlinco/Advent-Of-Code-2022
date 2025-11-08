const { triggerAsyncId } = require("async_hooks");
const { FORMERR } = require("dns");
const fs = require("fs");

const input = fs.readFileSync("day-nine/input.txt", "utf8");
const example = fs.readFileSync("day-nine/example.txt", "utf8");
const partTwoExample = fs.readFileSync("day-nine/part-two-example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const partTwoExampleRows = partTwoExample.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)


const trailingKnotMover = (hx, hy, tx, ty) => {
        // tail moving
        let yDiff = hy - ty
        let xDiff = hx - tx
        // up case hy - ty is 2 and hx - tx is 0
        if (yDiff === 2 &&  xDiff === 0) {
            ty++
        } else if (
            // up right case (hy - ty is 1 AND hx - tx is 2) OR (hy - ty is 2 AND hx - tx is 1)
            (yDiff === 1 && xDiff === 2) || (yDiff === 2 && xDiff === 1) || (yDiff === 2 && xDiff === 2)
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
             (yDiff === -1 && xDiff === 2) || (yDiff === -2 && xDiff === 1) || (yDiff === -2 && xDiff === 2)
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
            (yDiff === -1 && xDiff === -2) || (yDiff === -2 && xDiff === -1) || (yDiff === -2 && xDiff === -2)
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
            (yDiff === 1 && xDiff === -2) || (yDiff === 2 && xDiff === -1) || (yDiff === 2 && xDiff === -2)
        ) {
            tx--
            ty++
        }
        return [tx, ty]
}

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
            [tx, ty] = trailingKnotMover(hx, hy, tx, ty)
            tailPositionSet.add(`${tx.toString()},${ty.toString()}`)
        }
    }

    return tailPositionSet.size
}

function longTailPositionReporter(directions) {
    let tailPositionSet = new Set()
    let hx = 0
    let hy = 0
    let oneX = 0
    let oneY = 0
    let twoX = 0
    let twoY = 0
    let threeX = 0
    let threeY = 0
    let fourX = 0
    let fourY = 0
    let fiveX = 0
    let fiveY = 0
    let sixX = 0
    let sixY = 0
    let sevenX = 0
    let sevenY = 0
    let eightX = 0
    let eightY = 0
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
            const oneResult = trailingKnotMover(hx, hy, oneX, oneY)
            oneX = oneResult[0]
            oneY = oneResult[1]
            const twoResult = trailingKnotMover(oneX, oneY, twoX, twoY)
            twoX = twoResult[0]
            twoY = twoResult[1]
            const threeResult = trailingKnotMover(twoX, twoY, threeX, threeY)
            threeX = threeResult[0]
            threeY = threeResult[1]
            const fourResult = trailingKnotMover(threeX, threeY, fourX, fourY)
            fourX = fourResult[0]
            fourY = fourResult[1]
            const fiveResult = trailingKnotMover(fourX, fourY, fiveX, fiveY)
            fiveX = fiveResult[0]
            fiveY = fiveResult[1]
            const sixResult = trailingKnotMover(fiveX, fiveY, sixX, sixY)
            sixX = sixResult[0]
            sixY = sixResult[1]
            const sevenResult = trailingKnotMover(sixX, sixY, sevenX, sevenY)
            sevenX = sevenResult[0]
            sevenY = sevenResult[1]
            const eightResult = trailingKnotMover(sevenX, sevenY, eightX, eightY)
            eightX = eightResult[0]
            eightY = eightResult[1]
            const trailingResult = trailingKnotMover(eightX, eightY, tx, ty)
            tx = trailingResult[0]
            ty = trailingResult[1]
            tailPositionSet.add(`${tx.toString()},${ty.toString()}`)
        }
    }
    return tailPositionSet.size
}


console.log(tailPositionReporter(exampleRows))
console.log(tailPositionReporter(inputRows))

console.log(longTailPositionReporter(partTwoExampleRows))
console.log(longTailPositionReporter(inputRows))


