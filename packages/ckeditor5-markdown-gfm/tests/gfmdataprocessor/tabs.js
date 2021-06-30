/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'tabs', () => {
		it( 'should process list item with tabs', () => {
			testDataProcessor(
				'+ this is a list item indented with tabs',

				'<ul>\n' +
					'<li>this is a list item indented with tabs</li>\n' +
				'</ul>',

				'*   this is a list item indented with tabs\n'
			);
		} );

		it( 'should process list item with spaces', () => {
			testDataProcessor(
				'+   this is a list item indented with spaces',

				'<ul>\n' +
					'<li>this is a list item indented with spaces</li>\n' +
				'</ul>',

				'*   this is a list item indented with spaces\n'
			);
		} );

		it( 'should process code block indented by tab', () => {
			testDataProcessor(
				'	this code block is indented by one tab',

				'<pre><code>this code block is indented by one tab\n' +
				'</code></pre>',

				'```\n' +
				'this code block is indented by one tab\n' +
				'```\n'
			);
		} );

		it( 'should process code block indented by two tabs', () => {
			testDataProcessor(
				'		this code block is indented by two tabs',

				'<pre><code>\tthis code block is indented by two tabs\n' +
				'</code></pre>',

				'```\n' +
				'\tthis code block is indented by two tabs\n' +
				'```\n'
			);
		} );

		it( 'should process list items indented with tabs as code block', () => {
			testDataProcessor(
				'	+	list item\n' +
				'	next line',

				'<pre><code>+\tlist item\n' +
				'next line\n' +
				'</code></pre>',

				'```\n' +
				'+\tlist item\n' +
				'next line\n' +
				'```\n'
			);
		} );
	} );
} );
