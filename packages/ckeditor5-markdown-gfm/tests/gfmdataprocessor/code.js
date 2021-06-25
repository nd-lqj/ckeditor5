/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'code', () => {
		it( 'should process inline code', () => {
			testDataProcessor(
				'regular text and `inline code`',

				'<p>regular text and <code>inline code</code></p>',

				'regular text and `inline code`\n'
			);
		} );

		it( 'should properly process multiple code', () => {
			testDataProcessor(
				'`this is code` and this is `too`',

				'<p><code>this is code</code> and this is <code>too</code></p>',

				'`this is code` and this is `too`\n'
			);
		} );

		it( 'should process spaces inside inline code', () => {
			testDataProcessor(
				'regular text and` inline code`',

				'<p>regular text and<code> inline code</code></p>',

				'regular text and` inline code`\n'
			);
		} );

		it( 'should properly process backticks inside code spans #1', () => {
			testDataProcessor(
				'`` `backticks` ``',

				'<p><code>`backticks`</code></p>',

				'`` `backticks` ``\n'
			);
		} );

		it( 'should properly process backticks inside code spans #2', () => {
			testDataProcessor(
				'``some `backticks` inside``',

				'<p><code>some `backticks` inside</code></p>',

				'``some `backticks` inside``\n'
			);
		} );

		it( 'should process code blocks indented with tabs', () => {
			testDataProcessor(
				'	code block',

				'<pre><code>code block\n' +
				'</code></pre>',

				'```\n' +
				'code block\n' +
				'```\n'
			);
		} );

		it( 'should process code blocks indented with spaces', () => {
			testDataProcessor(
				'    code block',

				'<pre><code>code block\n' +
				'</code></pre>',

				'```\n' +
				'code block\n' +
				'```\n'
			);
		} );

		it( 'should process multi line code blocks indented with tabs', () => {
			testDataProcessor(
				'	first line\n' +
				'	second line',

				'<pre><code>first line\n' +
				'second line\n' +
				'</code></pre>',

				'```\n' +
				'first line\n' +
				'second line\n' +
				'```\n'
			);
		} );

		it( 'should process multi line code blocks indented with spaces', () => {
			testDataProcessor(
				'    first line\n' +
				'    second line',

				'<pre><code>first line\n' +
				'second line\n' +
				'</code></pre>',

				'```\n' +
				'first line\n' +
				'second line\n' +
				'```\n'
			);
		} );

		it( 'should process multi line code blocks with trailing spaces', () => {
			testDataProcessor(
				'	the lines in this block  \n' +
				'	all contain trailing spaces  ',

				'<pre><code>the lines in this block  \n' +
				'all contain trailing spaces  \n' +
				'</code></pre>',

				'```\n' +
				'the lines in this block\n' +
				'all contain trailing spaces\n' +
				'```\n'
			);
		} );

		it( 'should process code block with language name', () => {
			testDataProcessor(
				'```js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```',

				'<pre><code class="language-js">var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'</code></pre>',

				'```js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```\n'
			);
		} );

		it( 'should process code block with language name and using ~~~ as delimiter', () => {
			testDataProcessor(
				'~~~ bash\n' +
				'#!/bin/bash\n' +
				'~~~',

				'<pre><code class="language-bash">#!/bin/bash\n' +
				'</code></pre>',

				'```bash\n' +
				'#!/bin/bash\n' +
				'```\n'
			);
		} );

		it( 'should process code block with language name and using ``````` as delimiter', () => {
			testDataProcessor(
				'```````js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```````',

				'<pre><code class="language-js">var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'</code></pre>',

				'```js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```\n'
			);
		} );

		it( 'should process code block with language name and using ~~~~~~~~~~ as delimiter', () => {
			testDataProcessor(
				'~~~~~~~~~~ js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'~~~~~~~~~~',

				'<pre><code class="language-js">var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'</code></pre>',

				'```js\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```\n'
			);
		} );

		it( 'should process empty code block', () => {
			testDataProcessor(
				'```js\n' +
				'```',

				'<pre><code class="language-js">' +
				'</code></pre>',

				'```js\n' +
				'```\n'
			);
		} );

		it( 'should process code block with empty line', () => {
			testDataProcessor(
				'```js\n' +
				'\n' +
				'```',

				'<pre><code class="language-js">' +
				'</code></pre>',

				'```js\n' +
				'```\n'
			);
		} );

		it( 'should process nested code', () => {
			testDataProcessor(
				'````` code `` code ``` `````',

				'<p><code>code `` code ```</code></p>',

				'`code `` code ``` `\n'
			);
		} );

		it( 'should handle triple ticks inside code', () => {
			testDataProcessor(
				'````\n' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'````',

				'<pre><code>' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'</code></pre>',

				'````\n' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'````\n'
			);
		} );

		it( 'should handle triple and quatruple ticks inside code', () => {
			testDataProcessor(
				'`````\n' +
				'````\n' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'````\n' +
				'`````',

				'<pre><code>' +
				'````\n' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'````\n' +
				'</code></pre>',

				'`````\n' +
				'````\n' +
				'```\n' +
				'Code\n' +
				'```\n' +
				'````\n' +
				'`````\n'
			);
		} );

		it( 'should support #registerRawContentMatcher()', () => {
			const viewFragment = testDataProcessor(
				'```raw\n' +
				'var a = \'hello\';\n' +
				'console.log(a + \' world\');\n' +
				'```',

				'<pre><code class="language-raw"></code></pre>',

				'```raw\n' +
				'```\n',

				{
					setup( processor ) {
						processor.registerRawContentMatcher( {
							name: 'code',
							classes: 'language-raw'
						} );
					}
				}
			);

			expect( viewFragment.getChild( 0 ).getChild( 0 ).getCustomProperty( '$rawContent' ) ).to.equal(
				[
					'var a = \'hello\';',
					'console.log(a + \' world\');\n'
				].join( '\n' )
			);
		} );
	} );
} );
