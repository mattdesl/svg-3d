var bounds = require('getboundingbox')
var unlerp = require('unlerp')

module.exports.normalize = function normalize(path) {
    var b = bounds(path)
    
    path.forEach(function(p) {
        p[0] = unlerp(b.minX, b.maxX, p[0])*2-1
        p[1] = unlerp(b.minY, b.maxY, p[1])*2-1
    })
    return path
}
