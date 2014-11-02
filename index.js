// //very limited SVG -> path tool


// var parse = require('parse-svg-path')
// var sub = require('vectors/sub')(2)
// var add = require('vectors/add')(2)
// var copy = require('vectors/copy')(2)
// var absoluteSVG = require('abs-svg-path')

// function copy(out, cmd) {
//     out[0] = cmd[0]
//     out[1] = cmd[1]
//     out[2] = cmd[2]
//     out[3] = cmd[3]
//     return out
// }

// module.exports = function(contents) {
//     var svg = parse(contents)

//     var pen = [0, 0]
//     var pathStart = 0

//     var paths = []

//     var abs = absoluteSVG(svg)

//     abs.forEach(function(cmd, i, self) {
//         if (cmd[0]==='S')
//             cmd[0] = 'Q'
//         if (cmd[0]==='z'||cmd[0]==='Z') {
//             var path = self.slice(pathStart, i)

//             //create a close-to command using line-to
//             var initial = path[0].slice()
//             initial[0] = 'L'
//             path.push(initial)

//             paths.push(path)
//             pathStart = i+1
//             debugger
//         }
//     })

//     if (paths.length === 0)
//         paths = [abs]

//     // svg.forEach(function(cmd, i) {
//     //     if (!absolute(cmd))
//     //         toAbsolute(pen, cmd)
//     //     if (initial) {
//     //         initial = false
//     //         first = cmd.slice()
//     //         first[0] = 'L'
//     //     }
//     //     else if (cmd[0]==='z'||cmd[0]==='Z') { //change close-to to a line-to
//     //         copy(cmd, first)
//     //         initial = true //reset initial for next subpath
//     //         paths = svg.slice(pathStart, )
//     //     }
//     //     lastPoint(pen, cmd)
//     // })

//     return paths
//     // return svg
// }


// function absolute(cmd) {
//     var chr = cmd[0]
//     return chr.toUpperCase() === chr
// }

// function lastPoint(out, cmd) {
//     out[0] = cmd[cmd.length-2]
//     out[1] = cmd[cmd.length-1]
// }

// function toAbsolute(last, cmd) {
//     cmd[0] = cmd[0].toUpperCase()
//     for (var i=1; i<cmd.length; i+=2) {
//         cmd[i] =  cmd[i] + last[0]
//         cmd[i+1] = cmd[i+1] + last[1]
//     }
// }