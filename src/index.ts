import * as path from "node:path";
import {fileURLToPath} from 'node:url';
import {cp} from './utils'
import { consola } from "consola";
import * as process from "process";


(async () => {
    const response =  await consola.prompt("package name:", );



    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../..',
        'templates'
    )
    await cp(templateDir, process.cwd(), response);
})()





















