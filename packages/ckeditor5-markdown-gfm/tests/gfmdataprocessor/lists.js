/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'lists', () => {
		it( 'should process tight asterisks', () => {
			testDataProcessor(
				'*	item 1\n' +
				'*	item 2\n' +
				'*	item 3',

				'<ul>\n' +
					'<li>item 1</li>\n' +
					'<li>item 2</li>\n' +
					'<li>item 3</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'*   item 2\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process loose asterisks', () => {
			testDataProcessor(
				'*	item 1\n' +
				'\n' +
				'*	item 2\n' +
				'\n' +
				'*	item 3',

				'<ul>\n' +
					'<li>\n' +
						'<p>item 1</p>\n' +
					'</li>\n' +
					'<li>\n' +
						'<p>item 2</p>\n' +
					'</li>\n' +
					'<li>\n' +
						'<p>item 3</p>\n' +
					'</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'*   item 2\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process tight pluses', () => {
			testDataProcessor(
				'+	item 1\n' +
				'+	item 2\n' +
				'+	item 3',

				'<ul>\n' +
					'<li>item 1</li>\n' +
					'<li>item 2</li>\n' +
					'<li>item 3</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'*   item 2\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process loose pluses #1', () => {
			testDataProcessor(
				'+	item 1\n' +
				'\n' +
				'+	item 2\n' +
				'\n' +
				'+	item 3',

				'<ul>\n' +
					'<li>\n' +
						'<p>item 1</p>\n' +
					'</li>\n' +
					'<li>\n' +
						'<p>item 2</p>\n' +
					'</li>\n' +
					'<li>\n' +
						'<p>item 3</p>\n' +
					'</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'*   item 2\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process loose pluses #2', () => {
			testDataProcessor(
				'+	item 1\n' +
				'<!---->\n' +
				'+	item 2\n' +
				'<!---->\n' +
				'+	item 3',

				'<ul>\n' +
					'<li>item 1</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>item 2</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>item 3</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process tight minuses', () => {
			testDataProcessor(
				'-	item 1\n' +
				'-	item 2\n' +
				'-	item 3',

				'<ul>\n' +
					'<li>item 1</li>\n' +
					'<li>item 2</li>\n' +
					'<li>item 3</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'*   item 2\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process loose minuses', () => {
			testDataProcessor(
				'-	item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'-	item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'-	item 3',

				'<ul>\n' +
					'<li>item 1</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>item 2</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>item 3</li>\n' +
				'</ul>',

				'*   item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   item 3\n'
			);
		} );

		it( 'should process ordered list with tabs', () => {
			testDataProcessor(
				'1.	item 1\n' +
				'2.	item 2\n' +
				'3.	item 3',

				'<ol>\n' +
					'<li>item 1</li>\n' +
					'<li>item 2</li>\n' +
					'<li>item 3</li>\n' +
				'</ol>',

				'1.  item 1\n' +
				'2.  item 2\n' +
				'3.  item 3\n'
			);
		} );

		it( 'should process ordered list with spaces', () => {
			testDataProcessor(
				'1. item 1\n' +
				'2. item 2\n' +
				'3. item 3',

				'<ol>\n' +
					'<li>item 1</li>\n' +
					'<li>item 2</li>\n' +
					'<li>item 3</li>\n' +
				'</ol>',

				'1.  item 1\n' +
				'2.  item 2\n' +
				'3.  item 3\n'
			);
		} );

		it( 'should process loose ordered list with tabs', () => {
			testDataProcessor(
				'1.	item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.	item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.	item 3',

				'<ol>\n' +
					'<li>item 1</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>item 2</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>item 3</li>\n' +
				'</ol>',

				'1.  item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  item 3\n'
			);
		} );

		it( 'should process loose ordered list with spaces', () => {
			testDataProcessor(
				'1. item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1. item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1. item 3',

				'<ol>\n' +
					'<li>item 1</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>item 2</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>item 3</li>\n' +
				'</ol>',

				'1.  item 1\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  item 2\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  item 3\n'
			);
		} );

		it( 'should process nested and mixed lists', () => {
			testDataProcessor(
				'1. First\n' +
				'2. Second:\n' +
				'	* Fee\n' +
				'	* Fie\n' +
				'	* Foe\n' +
				'3. Third',

				'<ol>\n' +
					'<li>First</li>\n' +
					'<li>Second:\n' +
						'<ul>\n' +
							'<li>Fee</li>\n' +
							'<li>Fie</li>\n' +
							'<li>Foe</li>\n' +
						'</ul>\n' +
					'</li>\n' +
					'<li>Third</li>\n' +
				'</ol>',

				'1.  First\n' +
				'2.  Second:\n' +
				'    *   Fee\n' +
				'    *   Fie\n' +
				'    *   Foe\n' +
				'3.  Third\n'
			);
		} );

		it( 'should process nested and mixed loose lists', () => {
			testDataProcessor(
				'1. First\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1. Second:\n' +
				'	* Fee\n' +
				'	* Fie\n' +
				'	* Foe\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1. Third',

				'<ol>\n' +
					'<li>First</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>Second:\n' +
						'<ul>\n' +
							'<li>Fee</li>\n' +
							'<li>Fie</li>\n' +
							'<li>Foe</li>\n' +
						'</ul>\n' +
					'</li>\n' +
				'</ol>\n' +
				'<ol>\n' +
					'<li>Third</li>\n' +
				'</ol>',

				'1.  First\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  Second:\n' +
				'    *   Fee\n' +
				'    *   Fie\n' +
				'    *   Foe\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'1.  Third\n'
			);
		} );

		it( 'should create same bullet from different list indicators', () => {
			testDataProcessor(
				'* test\n' +
				'+ test\n' +
				'- test',

				'<ul>\n' +
					'<li>test</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>test</li>\n' +
				'</ul>\n' +
				'<ul>\n' +
					'<li>test</li>\n' +
				'</ul>',

				'*   test\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   test\n' +
				'\n' +
				'<!---->\n' +
				'\n' +
				'*   test\n'
			);
		} );
	} );
} );
