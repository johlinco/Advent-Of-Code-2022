
const fs = require("fs");

const input = fs.readFileSync("day-seven/input.txt", "utf8");
const example = fs.readFileSync("day-seven/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

class Directory {
    constructor() {
        this.children = [];
        this.size = 0;
        this.parent = ""
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
                dirTree[dirName].parent = currDir;
                dirTree[currDir].children.push(dirName);
            }
        } else {
            dirTree[currDir].size += parseInt(commandArray[0])
            let upParent = dirTree[currDir].parent
            while (upParent !== "") {
                dirTree[upParent].size += parseInt(commandArray[0])
                upParent = dirTree[upParent].parent
            }
        }
    }

    let underOneHundredKSum = 0

    function dfs(root) {
        if (!root) return
        if (root.size <= 100000) {
            underOneHundredKSum += root.size
        }
        for (const child of root.children) {
            console.log(dirTree[child])
            dfs(dirTree[child])
        }
    }
    dfs(dirTree["/"]) 
    return underOneHundredKSum
}

console.log(sumOfDirsUnderOneHundredK(exampleRows));
console.log(sumOfDirsUnderOneHundredK(inputRows));