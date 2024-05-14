
const fs = require("fs");

const input = fs.readFileSync("day-seven/input.txt", "utf8");
const example = fs.readFileSync("day-seven/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

class Directory {
    constructor() {
        this.children = [];
        this.size = 0;
    }
}

function sumOfDirsUnderOneHundredK(commands) {
    let dirStack = [];
    let currDir = "/";
    let root = new Directory("/")
    let dirTree = {};
 
    dirTree["/"] = root
    dirStack.push(currDir);

    for (const command of commands) {
        let commandArray = command.split(" ")
        if (commandArray[0] === "$") {
            if (commandArray[1] === "cd") {
                if (commandArray[2] === "..") {
                    dirStack.pop();
                    currDir = dirStack[dirStack.length - 1];
                } else {
                    dirStack.push(commandArray[2]);
                    currDir = commandArray[2];
                }
            }
        } else if (commandArray[0] === "dir") {
            let dirName = commandArray[1];
            if (!dirTree[dirName]) {
                let dir = new Directory()
                dirTree[dirName] = dir;
                dirTree[currDir].children.push(dirName);
            }
        } else {
            dirTree[currDir].size += parseInt(commandArray[0])
        }
    }
    return dirTree
}

console.log(sumOfDirsUnderOneHundredK(exampleRows));