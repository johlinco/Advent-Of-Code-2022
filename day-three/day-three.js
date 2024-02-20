const fs = require("fs");

const input = fs.readFileSync("day-three/input.txt", "utf8");

let rucksacks = input.split(/\r?\n/)

const priorities = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26,
    'A': 27,
    'B': 28,
    'C': 29,
    'D': 30,
    'E': 31,
    'F': 32,
    'G': 33,
    'H': 34,
    'I': 35,
    'J': 36,
    'K': 37,
    'L': 38,
    'M': 39,
    'N': 40,
    'O': 41,
    'P': 42,
    'Q': 43,
    'R': 44,
    'S': 45,
    'T': 46,
    'U': 47,
    'V': 48,
    'W': 49,
    'X': 50,
    'Y': 51,
    'Z': 52,
}

function ruckSackPriorities(rucksacks) {
    let prioritySum = 0

    for (const rucksack of rucksacks) {
        let ruckSet = new Set()
        for (let i = 0; i < rucksack.length/2; i++) {
            ruckSet.add(rucksack[i])
        }
        for (let i = rucksack.length-1; i >= rucksack.length/2; i--) {
            if (ruckSet.has(rucksack[i])) {
                prioritySum += priorities[rucksack[i]]
                break
            }
        }
    }
    
    return (prioritySum)
}

function groupPriority(rucksacks) {
    let prioritySum = 0
    let elfInGroup = 1
    let firstSet = new Set()
    let secondSet = new Set()
    for (const rucksack of rucksacks) {
        if (elfInGroup === 1) {
            for (const char of rucksack) {
                firstSet.add(char)
            }
        } else if (elfInGroup === 2) {
            for (const char of rucksack) {
                if (firstSet.has(char)) {
                    secondSet.add(char)
                }
            }
        } else if (elfInGroup === 3) {
            for (const char of rucksack) {
                if (secondSet.has(char)) {
                    prioritySum += priorities[char]
                    break
                }
            }
        }
        elfInGroup++;
        if (elfInGroup === 4) {
            elfInGroup = 1
            firstSet = new Set()
            secondSet = new Set()
        }
    }

    return prioritySum
}

console.log(ruckSackPriorities(rucksacks))
console.log(groupPriority(rucksacks))
