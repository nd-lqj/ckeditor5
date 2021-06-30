/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'blockquotes', () => {
		it( 'should process single blockquotes', () => {
			testDataProcessor(
				'> foo bar',

				'<blockquote>\n' +
					'<p>foo bar</p>\n' +
				'</blockquote>',

				'> foo bar\n'
			);
		} );

		it( 'should process nested blockquotes', () => {
			testDataProcessor(
				'> foo\n' +
				'>\n' +
				'> > bar\n' +
				'>\n' +
				'> foo',

				'<blockquote>\n' +
					'<p>foo</p>\n' +
					'<blockquote>\n' +
						'<p>bar</p>\n' +
					'</blockquote>\n' +
					'<p>foo</p>\n' +
				'</blockquote>',

				'> foo\n' +
				'>\n' +
				'> > bar\n' +
				'>\n' +
				'> foo\n'
			);
		} );

		it( 'should process list within a blockquote', () => {
			testDataProcessor(
				'> A list within a blockquote:\n' +
				'>\n' +
				'> * asterisk 1\n' +
				'> * asterisk 2\n' +
				'> * asterisk 3',

				'<blockquote>\n' +
					'<p>A list within a blockquote:</p>\n' +
					'<ul>\n' +
						'<li>asterisk 1</li>\n' +
						'<li>asterisk 2</li>\n' +
						'<li>asterisk 3</li>\n' +
					'</ul>\n' +
				'</blockquote>',

				'> A list within a blockquote:\n' +
				'>\n' +
				'> *   asterisk 1\n' +
				'> *   asterisk 2\n' +
				'> *   asterisk 3\n'
			);
		} );

		it( 'should process blockquotes with code inside with ```', () => {
			testDataProcessor(
				'> Example 1:\n' +
				'>\n' +
				'> ```\n' +
				'> code 1\n' +
				'> ```\n' +
				'>\n' +
				'> Example 2:\n' +
				'>\n' +
				'> ```\n' +
				'> code 2\n' +
				'> ```',

				'<blockquote>\n' +
					'<p>Example 1:</p>\n' +
					'<pre>' +
						'<code>' +
							'code 1\n' +
						'</code>' +
					'</pre>\n' +
					'<p>Example 2:</p>\n' +
					'<pre>' +
						'<code>' +
							'code 2\n' +
						'</code>' +
					'</pre>\n' +
				'</blockquote>',

				'> Example 1:\n' +
				'>\n' +
				'> ```\n' +
				'> code 1\n' +
				'> ```\n' +
				'>\n' +
				'> Example 2:\n' +
				'>\n' +
				'> ```\n' +
				'> code 2\n' +
				'> ```\n'
			);
		} );

		it( 'should process blockquotes with code inside with tabs', () => {
			testDataProcessor(
				'> Example 1:\n' +
				'>\n' +
				'>     code 1\n' +
				'>\n' +
				'> Example 2:\n' +
				'>\n' +
				'>     code 2\n',

				'<blockquote>\n' +
					'<p>Example 1:</p>\n' +
					'<pre>' +
						'<code>' +
							'code 1\n' +
						'</code>' +
					'</pre>\n' +
					'<p>Example 2:</p>\n' +
					'<pre>' +
						'<code>' +
							'code 2\n' +
						'</code>' +
					'</pre>\n' +
				'</blockquote>',

				'> Example 1:\n' +
				'>\n' +
				'> ```\n' +
				'> code 1\n' +
				'> ```\n' +
				'>\n' +
				'> Example 2:\n' +
				'>\n' +
				'> ```\n' +
				'> code 2\n' +
				'> ```\n'
			);
		} );
	} );
} );
