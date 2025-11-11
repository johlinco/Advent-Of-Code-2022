
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
    let sumOfDirsSizedLessThan100K = 0

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
    }

    const dirSizer = (dir) => {
        let fileSize = 0
        for (let i = 0; i < fileTree[dir].files.length; i++) {
            fileSize += fileTree[dir].files[i].size
        }
        for (let i = 0; i < fileTree[dir].children.length; i++) {
            let child = dir + "/" + fileTree[dir].children[i]
            fileSize += dirSizer(child)
        }
        if (fileSize <= 100_000) {
            sumOfDirsSizedLessThan100K += fileSize
        }
        fileTree[dir].bytes = fileSize
    return fileSize
    }
    dirSizer("/")
    return sumOfDirsSizedLessThan100K
}

const dirSizer = (dir) => {
    const fileTree = fileTreeBuilder(exampleRows)
    let fileSize = 0
    for (let i = 0; i < fileTree[dir].files.length; i++) {
        fileSize += fileTree[dir].files[i].size
    }
    for (let i = 0; i < fileTree[dir].children.length; i++) {
        let child = dir + "/" + fileTree[dir].children[i]
        fileSize += dirSizer(child)
    }
    fileTree[dir].megabytes = fileSize
    return fileSize
}
console.log(fileTreeBuilder(exampleRows))
console.log(fileTreeBuilder(inputRows))

