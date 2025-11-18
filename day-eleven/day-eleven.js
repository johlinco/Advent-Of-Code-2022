
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const example = fs.readFileSync("example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

/**
 * 
 * {
 *      itemsToThrow: [],
 *      itemsCaught: [],
 *      function: [arithmetic, number],
 *      true: number,
 *      false: number,
 * }
 * 
 */

const monkeysBuilder = (directions) => {
    let monkeys = []
    for (let i = 0; i < directions.length; i++) {

        if (directions[i].split(" ")[0] === "Monkey") {
            let monkey = {}
            i++
            let startingItems = directions[i].split(":")[1].split(",")
            monkey.caughtItems = []
            for (const item of startingItems) {
                monkey.caughtItems.push(parseInt(item))
            }
            i++
            monkey.math = [directions[i].split(":")[1].split(" ")[4], directions[i].split(":")[1].split(" ")[5]]
            i++
            monkey.test = parseInt(directions[i].split(" ").pop())
            i++
            monkey.trueMonkey = parseInt(directions[i].split(" ").pop())
            i++
            monkey.falseMonkey = parseInt(directions[i].split(" ").pop())
            monkey.inspections = 0
            monkeys.push(monkey)
        }
    }
    return monkeys
}

const monkeyBusinessProduct = (directions) => {
    let monkeys = monkeysBuilder(directions)
    for (let i = 0; i < 20; i++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].caughtItems.length) {
                monkeys[i].inspections++
                let item = monkeys[i].caughtItems.pop()
                let num =  monkeys[i].math[1] === "old" ? item : parseInt(monkeys[i].math[1])
                let action = monkeys[i].math[0]
                let divisor = monkeys[i].test
                if (action === "*") {
                    item *= num
                } else {
                    item += num
                }
                item = Math.floor(item / 3)
                let trueMonkey = monkeys[i].trueMonkey
                let falseMonkey = monkeys[i].falseMonkey
                if (item % divisor === 0) {
                    monkeys[trueMonkey].caughtItems.push(item)
                } else {
                    monkeys[falseMonkey].caughtItems.push(item)
                }
            }
        }
    }
    let first = 0
    let second = 0
    for (let i = 0; i < monkeys.length; i++) {
        let num = monkeys[i].inspections
        if (num > first) {
            second = first
            first = num
        } else if (num > second) {
            second = num
        }
    }



    return first * second
}

const monkeyBusinessProductUnrestrained = (directions) => {
    let monkeys = monkeysBuilder(directions)
    for (let i = 0; i < 1000; i++) {
        for (let i = 0; i < monkeys.length; i++) {
            while (monkeys[i].caughtItems.length) {
                monkeys[i].inspections++
                let item = monkeys[i].caughtItems.pop()
                let num =  monkeys[i].math[1] === "old" ? item : parseInt(monkeys[i].math[1])
                let action = monkeys[i].math[0]
                let divisor = monkeys[i].test
                if (action === "*") {
                    item *= num
                } else {
                    item += num
                }
                let trueMonkey = monkeys[i].trueMonkey
                let falseMonkey = monkeys[i].falseMonkey
                if (item % divisor === 0) {
                    monkeys[trueMonkey].caughtItems.push(item)
                } else {
                    monkeys[falseMonkey].caughtItems.push(item)
                }
            }
        }
    }
    let first = 0
    let second = 0
    for (let i = 0; i < monkeys.length; i++) {
        let num = monkeys[i].inspections
        if (num > first) {
            second = first
            first = num
        } else if (num > second) {
            second = num
        }
    }


    console.log(monkeys)
    return first * second
}

console.log(monkeyBusinessProduct(exampleRows))
console.log(monkeyBusinessProduct(inputRows))
console.log(monkeyBusinessProductUnrestrained(exampleRows))
console.log(monkeyBusinessProductUnrestrained(inputRows))