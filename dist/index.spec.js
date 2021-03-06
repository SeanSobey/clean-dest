"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const index_1 = require("./index");
mocha_1.describe(index_1.CleanDestination.name, () => {
    const defaultDelUtil = () => Promise.resolve([]);
    const defaultImportUtil = () => Promise.resolve({});
    function createSUT(config, delUtil, importUtil) {
        const defaultConfig = {
            srcRootPath: './src',
            destRootPath: './dest',
            basePattern: null,
            fileMapPath: null,
            permanent: true,
            verbose: true,
            dryRun: true
        };
        return new index_1.CleanDestination(Object.assign(defaultConfig, config), delUtil || defaultDelUtil, importUtil || defaultImportUtil);
    }
    mocha_1.describe('constructor', () => {
        mocha_1.it('exists', () => {
            const sut = createSUT();
            assert_1.strict.ok(sut);
        });
    });
    mocha_1.describe(index_1.CleanDestination.prototype.execute.name, () => {
        mocha_1.describe('given typescript file map', () => {
            const tsFileMap = {
                '.ts': (destFilePath) => [
                    destFilePath.replace(/.js$/, '.d.ts'),
                    destFilePath.replace(/.js$/, '.d.ts'),
                    destFilePath.replace(/.js$/, '.d.ts')
                ]
            };
            mocha_1.it('executes', async () => {
                const srcRootPath = './test/data/**/*';
                const sut = createSUT({ srcRootPath }, (patterns) => Promise.resolve(patterns), () => Promise.resolve(tsFileMap));
                const actual = await sut.execute();
                const expected = [
                    'dest/**/*',
                    '!../file1.ts',
                    '!../file2.ts',
                    '!../folder1',
                    '!../folder2',
                    '!../folder1/file3.ts',
                    '!../folder2/file4.ts'
                ];
                assert_1.strict.deepStrictEqual(actual, expected);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map