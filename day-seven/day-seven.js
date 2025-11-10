
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const example = fs.readFileSync("example.txt", "utf8");

const exampleRows = example.split(/\r?\n/)
const inputRows = input.split(/\r?\n/)

/**
 * 
 * dir = {
 *      parent: string,
 *      childrenDirs: array,
 *      files: array
 *  }
 * 
 */

const fileTreeBuilder = (commands) => {
    let fileTree = {}
    let currDir = []

    for (const command of commands) {
        let splitCommand = command.split(" ")
        if (splitCommand[1] === 'cd') {
            if (splitCommand[2] === "..") {
                currDir.pop()
            } else {
                let parentDir = [...currDir]
                currDir.push(splitCommand[2])
                let dirName = currDir.join("/")
                if (!fileTree[dirName]) {
                    fileTree[dirName] = {
                        parent: parentDir.join("/"),
                        children: [],
                        files: []
                    }
                }
            }
        } else if (splitCommand[0] === "dir") { 
            fileTree[currDir.join("/")].children.push(splitCommand[1])
        } else if (splitCommand[0] !== "$") {
            fileTree[currDir.join("/")].files.push({
                name: splitCommand[1],
                size: parseInt(splitCommand[0])
            })
        }
        //console.log(splitCommand, currDir, JSON.stringify(fileTree))
    }
    return fileTree
}

const dirSizer = (dir) => {
    const fileTree = fileTreeBuilder(exampleRows)
    let fileSize = 0
    for (let i = 0; i < fileTree[dir].files.length; i++) {
        fileSize += fileTree[dir].files[i].size
        console.log(fileSize)
    }
}
console.log(fileTreeBuilder(exampleRows))
dirSizer("/")
