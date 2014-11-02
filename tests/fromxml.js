var path = require('path')
var fs = require('fs')
var cheerio = require('cheerio')
var crypto = require('crypto')

var json = []

function hash(str) {
    return crypto.createHash('md5').update(str).digest("hex")
}

function grab(file) {
    var xml = fs.readFileSync(file, 'utf8')
    var $ = cheerio.load(xml)

    var basefile = path.basename(file, path.extname(file))
    var fullpath = ''

    $('path').each(function() {
        var d = $(this).attr('d') 
        fullpath += d.replace(/[\n\t]/g, ' ')+' '
    })

    fullpath = fullpath.trim()
    var id = hash(fullpath)
    json.push(fullpath)
    fs.writeFileSync(__dirname+'/paths/'+id+'.txt', fullpath)
}

var files = fs.readdirSync(__dirname+'/svg')

files.filter(function(f) {
    return path.extname(f) === '.svg'
}).forEach(function(f) {
    grab(path.join(__dirname, 'svg', f))
})


var js = 'module.exports = '+JSON.stringify(json)
fs.writeFileSync(__dirname+'/paths/index.js', js)