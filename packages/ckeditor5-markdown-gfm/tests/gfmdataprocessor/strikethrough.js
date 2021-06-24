/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'Strikethrough', () => {
		it( 'should process strikethrough text #1', () => {
			testDataProcessor(
				'~deleted~',
				'<p><del>deleted</del></p>',
				'~~deleted~~\n'
			);
		} );

		it( 'should process strikethrough text #2', () => {
			testDataProcessor(
				'~~deleted~~',
				'<p><del>deleted</del></p>',
				'~~deleted~~\n'
			);
		} );

		it( 'should process strikethrough inside text #1', () => {
			testDataProcessor(
				'This is ~deleted content~.',
				'<p>This is <del>deleted content</del>.</p>',
				'This is ~~deleted content~~.\n'
			);
		} );

		it( 'should process strikethrough inside text #2', () => {
			testDataProcessor(
				'This is ~~deleted content~~.',
				'<p>This is <del>deleted content</del>.</p>',
				'This is ~~deleted content~~.\n'
			);
		} );
	} );
} );
