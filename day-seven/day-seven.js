
const fs = require("fs");

const input = fs.readFileSync("day-seven/input.txt", "utf8");
const example = fs.readFileSync("day-seven/example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

class Directory {
    constructor(name) {
        this.children = [];
        this.size = 0;
        this.parent = "";
        this.name = name;
    }
}

function sumOfDirsUnderOneHundredK(commands) {
    let currDir = "/";
    let root = new Directory("/", "")
    let dirTree = {};
 
    dirTree["/"] = root
    console.log(dirTree["/"])
    for (const command of commands) {
        let commandArray = command.split(" ")
       // console.log(dirTree[currDir], commandArray)
        if (commandArray[0] === "$") {
            if (commandArray[1] === "cd") {
                
                if (commandArray[2] === "..") {
                    if (currDirr = "/") continue;
                    currDir = dirTree[currDir].parent
                } else if (commandArray[2] === "/") {
                    currDir = "/"
                } else {
                    currDir = commandArray[2];
                }
            }
        } else if (commandArray[0] === "dir") {
            let dirName = commandArray[1];
            if (!dirTree[dirName]) {
                let dir = new Directory(dirName)
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
        console.log(root)
        if (!root) return
        if (root.size <= 100000) {
            underOneHundredKSum += root.size
        }
        for (const child of root.children) {
            dfs(dirTree[child])
        }
    }
    dfs(dirTree["/"]) 
    return underOneHundredKSum
}

console.log(sumOfDirsUnderOneHundredK(exampleRows));
console.log(sumOfDirsUnderOneHundredK(inputRows));