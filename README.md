minifies all js files in the specified directory

uses [Terser](https://github.com/terser/terser) as the minifier

## setup

- download [tsk-minify-js.tar.xz](https://github.com/r1vn/tsk-minify-js/raw/master/tsk-minify-js.tar.xz) and unpack as `your-project/lib/tsk-minify-js`
- add a config entry to the manifest

example config: minifying all .js files in `build` directory

```
{
    module: 'lib/tsk-minify-js',
    config:
    {
        // path of the directory to look for files to minify in
        dir: 'build',
        // filter function applied to files in the dir
        filter: srcPath => srcPath.endsWith('.js'),
        // https://github.com/terser/terser#minify-options
        // lib/tsk-minify-js/node_modules/terser/README.md
        opts: 
        {
            mangle: true,
            ecma: 5
        }
    }
}
```