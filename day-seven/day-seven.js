
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const example = fs.readFileSync("example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)


const fileTreeBuilder = (commands) => {
    let fileTree = {}
    let currDir = []

    for (const command of commands) {
        let splitCommand = command.split(" ")
        if (splitCommand[1] === 'cd') {
            if (splitCommand[2] === "..") {
                currDir.pop()
            } else {
                currDir.push(splitCommand[2])
            }
        }
        console.log(splitCommand, currDir)
    }
}

fileTreeBuilder(exampleRows)