var PerspectiveCamera = require('cam3d').PerspectiveCamera

var files = require('./paths')
var parse = require('../')

var parse = require('parse-svg-path')
var decompose = require('./decompose-svg-path')

var time = 0
var index = 0
var camera = new PerspectiveCamera(50 * Math.PI/180, window.innerWidth, window.innerHeight)
var rotation = 0
var decomposed, shadowed, animated

var shadow = require('./shadow').map
var normalize = require('./util').normalize

require('canvas-testbed')(function(context, width, height, dt) {
    context.clearRect(0, 0, width, height)
    background(context, width, height)

    time += dt
    if (time > 1000) {
        time = 0
        index ++ 
        // index = 6
        next()
    }
    
    camera.setViewport(width, height)
    orbit()
    
    drawFloor(context)
    context.fillStyle = '#428fc5'
    context.fill()

    var shadow3d = to3D(shadowed)
    drawPath(context, shadow3d)
    context.globalAlpha = 0.4
    context.fillStyle = '#26282a'
    context.fill()

    var transformed = to3D(decomposed)
    drawPath(context, transformed)
    context.globalAlpha = 1
    context.fillStyle = '#fff'
    context.fill()

}, next, {
    once: false
})

function next() {
    var file = files[index%files.length]
    decomposed = normalize( decompose(parse(file), 6) )
    shadowed = shadow(decomposed, [-5, 25, -20])
}

function drawPath(context, path) {
    context.beginPath()
    path.forEach(function(p) {
        context.lineTo(p[0],p[1])
    })
}

function drawFloor(context) {
    var size = 4
    var floor = [
        [-size, 1, -size],
        [size, 1, -size],
        [size, 1, size],
        [-size, 1, size]
    ]
    drawPath(context, to3D(floor))
}

function background(context, width, height) {
    var r = Math.max(width, height)*1.8
    var grd = context.createRadialGradient(width/2, height/2, 0, width/2, height/2, r)
    grd.addColorStop(0, '#363636')
    grd.addColorStop(1, '#171717')
    context.fillStyle = grd
    context.fillRect(0, 0, width, height)
}

function orbit() {
    var cameraRadius = 6
    //orbit our camera a little around center 
    var hr = Math.sin(rotation)  + Math.PI/2

    var x = (Math.cos(hr)) * cameraRadius,
        z = (Math.sin(hr)) * cameraRadius

    camera.position.z = 4
    camera.position.x = x
    camera.position.y = -z*0.5

    rotation += 0.002

    //keep the camera looking at centre of world
    camera.lookAt(0, 0, 0)
    camera.up.set(0, 1, 0) 
    camera.update()
}

function to3D(points) {
    var out = {x:0, y:0}
    var result = []
    points.forEach(function(p) {
        var vec = {x:p[0], y:p[1], z:p[2]||0}
        camera.project(vec, out)
        result.push([out.x, out.y])
    })
    return result
}