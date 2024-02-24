const fs = require("fs");

const input = fs.readFileSync("day-six/input.txt", "utf8");
const example = fs.readFileSync("day-six/example.txt", "utf8");

function findMarkerEndPartOne(packet) {
    for (let i = 0; i < packet.length; i++) {
      var characterSet = new Set()
      characterSet.add(packet[i])
  
      for (let j= i+1; j < i+4; j++) {
  
        if (characterSet.has(packet[j])) {
          break
        }
        if (j === i+3) {
          return i+4
        }
        characterSet.add(packet[j])
      }
    }
  }
  
  function findMarkerEndPartTwo(packet) {
    for (let i = 0; i < packet.length; i++) {
      var characterSet = new Set()
      characterSet.add(packet[i])
  
      for (let j= i+1; j < i+14; j++) {
        if (characterSet.has(packet[j])) {
          break
        }
        if (j === i+13) {
          return i+14
        }
        characterSet.add(packet[j])
      }
    }
  }

console.log(findMarkerEndPartOne(input))  
console.log(findMarkerEndPartTwo(input))
  
  