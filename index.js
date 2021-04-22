'use strict' // 2021-04-06 08.51

const fs = require('fs')
const path = require('path')
const { minify } = require('terser')
const { xdDirScan } = require('./util/xdDirScan')
const { xdPath } = require('./util/xdPath')
const Config = require('./Config')

module.exports = function tsk_minify_js (cfg)
{
    const debug = process.argv.includes('-debug')
    const config = new Config(cfg)
    if (debug) console.log({ config })
    const srcdirRel  = xdPath.std(config.dir)
    const srcdirAbs  = xdPath.abs(config.dir)
    if (debug) console.log({ srcdirRel, srcdirAbs })
    const srcs = xdDirScan(`${ srcdirAbs }`, 'files').filter(config.filter)
    if (!srcs.length) return console.log(`no matches`)

    for (let i = 0; i < srcs.length; i++)
    {
        const srcRel = `${ srcdirRel }/${ srcs[i] }`
        const srcAbs = `${ srcdirAbs }/${ srcs[i] }`
        console.log(`${ i + 1 }/${ srcs.length } ${ srcRel }`)
        if (debug) console.log({ srcRel, srcAbs })
        const src = fs.readFileSync(srcAbs, 'utf8')
        minify(src, config.opts).then(result => fs.writeFileSync(srcAbs, result.code))
    }
}