#!/usr/bin/env node

const yargs = require("yargs")
const path = require('path');

const { inquirerPrompt } = require('./inquirer')
const { checkMkdirExists, copyDir, copyFile } = require("./copy")

yargs.command(
    ['create','c'],
    '新建一个模板',
    function (yargs) {
        return yargs.option('name',{
            alias:'n',
            demand: true,
            describe: '模板名称',
            type: 'string'
        })
    },
    function (argv) {
        // copy 文件夹
        // inquirerPrompt(argv).then(answers => {
        //     const { name, type} = answers;
        //     const isMkdirExists = checkMkdirExists(
        //         path.resolve(process.cwd(),`./src/pages/${name}`)
        //     );
        //     if (isMkdirExists) {
        //         console.log(`${name}文件夹已经存在`);
        //     } else {
        //         copyDir(
        //             path.relative(__dirname,`./template/${type}`),
        //             path.relative(process.cwd(),`./src/pages/${name}`)
        //         )
        //     }
        // })

        // copy 文件
        inquirerPrompt(argv).then(answers => {
            const { name, type} = answers;
            const isMkdirExists = checkMkdirExists(
                path.resolve(process.cwd(),`./src/pages/${name}/index.js`)
            );
            console.log(__dirname,'__dirname',);
            if (isMkdirExists) {
                console.log(`${name}/index.js文件夹已经存在`);
            } else {
                copyFile(
                    path.resolve(__dirname,`./template/${type}/index.js`),
                    path.resolve(process.cwd(),`./src/pages/${name}/index.js`),
                    {
                        name,
                    }
                )
            }
        })
    }
).argv

