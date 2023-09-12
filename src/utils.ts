import * as path from 'node:path';
import copy from 'recursive-copy';

import Mustache from 'mustache';
import * as fs from 'node:fs';
import {Readable} from 'stream';
import * as https from "node:https";
import {consola} from "consola";

const cp = async (inp, out, response) => {


    const options = {
        rename: function (filePath) {

            const filename = path.basename(filePath);

            return filename === '_gitignore' ? filePath.replace('_gitignore', '.gitignore') : filePath;
        }, transform: function (src, dest, stats) {
            if (path.basename(src) !== 'package.json') {
                return null;
            }
            const temp = fs.readFileSync(src).toString();


            return Readable.from(Mustache.render(temp, {
                name: response
            }), {encoding: 'utf8'});


        }
    };



    const dest = path.join(out,response);


    consola.start("Scaffolding...");
    await copy(inp, dest, options).on(copy.events.COPY_FILE_COMPLETE, function (copyOperation) {
        const rel = path.relative(dest, copyOperation.dest)
        consola.success('Created file ' + rel)

    });

    consola.success("Scaffolding complete");

}
const checkName = (name) => {

    return new Promise((resolve, reject) => {
        https.get('https://registry.npmjs.com/' + name, function (res) {
                if (res.statusCode === 404) {
                    // No existing package

                    resolve(false);
                }
                if (res.statusCode === 200) {
                    // Try and parse the JSON response


                    resolve(true);
                }
            }
        )

    })
}

export {cp, checkName}






