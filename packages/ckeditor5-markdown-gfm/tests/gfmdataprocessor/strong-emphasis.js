/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'strong and emphasis', () => {
		it( 'should process strong', () => {
			testDataProcessor(
				'**this is strong** and __this too__',
				'<p><strong>this is strong</strong> and <strong>this too</strong></p>',
				'**this is strong** and **this too**\n'
			);
		} );

		it( 'should process emphasis', () => {
			testDataProcessor(
				'*this is emphasis* and _this too_',
				'<p><em>this is emphasis</em> and <em>this too</em></p>',
				'*this is emphasis* and *this too*\n'
			);
		} );

		it( 'should process strong and emphasis together #1', () => {
			testDataProcessor(
				'***This is strong and em.***',
				'<p><em><strong>This is strong and em.</strong></em></p>',
				'***This is strong and em.***\n'
			);
		} );

		it( 'should process strong and emphasis together #2', () => {
			testDataProcessor(
				'Single ***word*** is strong and em.',
				'<p>Single <em><strong>word</strong></em> is strong and em.</p>',
				'Single ***word*** is strong and em.\n'
			);
		} );

		it( 'should process strong and emphasis together #3', () => {
			testDataProcessor(
				'___This is strong and em.___',
				'<p><em><strong>This is strong and em.</strong></em></p>',
				'***This is strong and em.***\n'

			);
		} );

		it( 'should process strong and emphasis together #4', () => {
			testDataProcessor(
				'Single ___word___ is strong and em.',
				'<p>Single <em><strong>word</strong></em> is strong and em.</p>',
				'Single ***word*** is strong and em.\n'
			);
		} );

		it( 'should not render escape marks', () => {
			testDataProcessor(
				'This should\\*not\\*be\\*emp.',
				'<p>This should*not*be*emp.</p>',
				'This should\\*not\\*be\\*emp.\n'
			);
		} );

		it( 'should process nested emphasis #1', () => {
			testDataProcessor(
				'*test **test** test*',
				'<p><em>test <strong>test</strong> test</em></p>',
				'*test **test** test*\n'
			);
		} );

		it( 'should process nested emphasis #2', () => {
			testDataProcessor(
				'_test __test__ test_',
				'<p><em>test <strong>test</strong> test</em></p>',
				'*test **test** test*\n'
			);
		} );
	} );
} );
