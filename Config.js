'use strict'

module.exports = class Config
{
    dir
    filter
    opts

    constructor (opts)
    {
        for (const key in this)
        {
            if (!opts.hasOwnProperty(key))
            {
                throw `missing property in config: ${ key }`
            }
        }

        for (const key in opts)
        {
            if (!this.hasOwnProperty(key))
            {
                throw `unknown property in config: ${ key }`
            }

            this[key] = opts[key]
        }

        // dir

        if (typeof this.dir !== 'string')
        {
            throw `config.dir: must be a string`
        }

        // filter

        for (const prop of ['filter'])
        {
            if (typeof this[prop] !== 'function')
            {
                throw `config.${ prop } must be a function`
            }
        }

        // opts

        if (!this.opts || this.opts.constructor !== Object)
        {
            throw `config.opts must be an object`
        }
    }
}