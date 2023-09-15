import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
    declaration: true,
    rollup: {
        inlineDependencies: true,
        resolve: {
            exportConditions: ['node'] as any
        }
    },
    entries: [
        'src/index'
    ],
    externals: [
        'node:path',
        'node:url',
        'node:fs',
        'node:stream',
        'node:https',
        'process'
    ]

})
