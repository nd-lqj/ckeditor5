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

				'<blockquote><p>foo bar</p></blockquote>',

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

				'<blockquote>' +
					'<p>foo</p>' +
					'<blockquote>' +
						'<p>bar</p>' +
					'</blockquote>' +
					'<p>foo</p>' +
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

				'<blockquote>' +
					'<p>A list within a blockquote:</p>' +
					'<ul>' +
						'<li>asterisk 1</li>' +
						'<li>asterisk 2</li>' +
						'<li>asterisk 3</li>' +
					'</ul>' +
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

				'<blockquote>' +
					'<p>Example 1:</p>' +
					'<pre>' +
						'<code>' +
							'code 1\n' +
						'</code>' +
					'</pre>' +
					'<p>Example 2:</p>' +
					'<pre>' +
						'<code>' +
							'code 2\n' +
						'</code>' +
					'</pre>' +
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

				'<blockquote>' +
					'<p>Example 1:</p>' +
					'<pre>' +
						'<code>' +
							'code 1\n' +
						'</code>' +
					'</pre>' +
					'<p>Example 2:</p>' +
					'<pre>' +
						'<code>' +
							'code 2\n' +
						'</code>' +
					'</pre>' +
				'</blockquote>',

				// When converting back to data, DataProcessor will normalize tabs to ```.
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
