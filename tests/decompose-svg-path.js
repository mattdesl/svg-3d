var bezier = require('adaptive-bezier-curve')
var abs = require('abs-svg-path')
var norm = require('normalize-svg-path')

function copy(out, segment) {
    out[0] = segment[1]
    out[1] = segment[2]
    return out
}

var tmp1 = [0,0],
    tmp2 = [0,0],
    tmp3 = [0,0]

function set(out, x, y) {
    out[0] = x
    out[1] = y
    return out
}

function bezierTo(points, scale, start, seg) {
    bezier(start, 
        set(tmp1, seg[1], seg[2]), 
        set(tmp2, seg[3], seg[4]),
        set(tmp3, seg[5], seg[6]), scale, points)
}

module.exports = function decompose(svg, scale, paths) {
    if (!paths)
        paths = []

    var points = []
    var pen = [0, 0]
    norm(abs(svg)).forEach(function(segment, i, self) {
        if (segment[0] === 'M') {
            copy(pen, segment)
            points.push(pen)
        } else if (segment[0] === 'C') {
            bezierTo(points, scale, pen, segment)
            set(pen, segment[5], segment[6])
        } else {
            throw new Error('illegal type in SVG: '+segment[0])
        }
    })
    return points
}