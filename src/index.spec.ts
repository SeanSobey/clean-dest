import { describe, it } from 'mocha';
import { strict as assert } from 'assert';
import del from 'del';
import path from 'path';

import { CleanDestination, CleanDestinationConfig, FileMapImport, Delete, FileMap } from './index';

describe(CleanDestination.name, () => {

	function createSUT(config?: Partial<CleanDestinationConfig>, delUtil?: typeof del, importUtil?: FileMapImport): CleanDestination {

		const defaultConfig: CleanDestinationConfig = {
			srcRootPath: './src',
			destRootPath: './dest',
			basePattern: null,
			fileMapPath: null,
			permanent: true,
			verbose: true,
			dryRun: true
		};
		const fileMap: FileMap = {
		};
		const defaultDelUtil: Delete = () => Promise.resolve([]);
		const defaultImportUtil: FileMapImport = () => Promise.resolve(fileMap);
		return new CleanDestination(Object.assign(defaultConfig, config), delUtil || defaultDelUtil, importUtil || defaultImportUtil);
	}

	describe('constructor', () => {

		it('exists', () => {

			const sut = createSUT();
			assert.ok(sut);
		});
	});

	describe(CleanDestination.prototype.execute.name, () => {

		it.only('executes', async () => {

			// const srcRootPath = '/some/path/';
			const sut = createSUT(undefined, undefined, (fileMapPath) => import(path.resolve(fileMapPath)));
			const actual = await sut.execute();
			const expected: Array<string> = [];
			assert.deepStrictEqual(actual, expected);
		});
	});
});
