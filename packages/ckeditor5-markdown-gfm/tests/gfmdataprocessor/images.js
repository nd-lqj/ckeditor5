/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'images', () => {
		it( 'should process images', () => {
			testDataProcessor(
				'![alt text](http://example.com/image.png "title text")',

				'<figure class="image"><img alt="alt text" src="http://example.com/image.png" title="title text"></img></figure>',

				'![alt text](http://example.com/image.png "title text")\n'

			);
		} );

		it( 'should process images without title', () => {
			testDataProcessor(
				'![alt text](http://example.com/image.png)',

				'<figure class="image"><img alt="alt text" src="http://example.com/image.png"></img></figure>',

				'![alt text](http://example.com/image.png)\n'
			);
		} );

		it( 'should process images without alt text', () => {
			testDataProcessor(
				'![](http://example.com/image.png "title text")',

				'<figure class="image"><img alt="" src="http://example.com/image.png" title="title text"></img></figure>',

				'![](http://example.com/image.png "title text")\n'
			);
		} );

		it( 'should process referenced images', () => {
			testDataProcessor(
				'![alt text][logo]\n\n' +
				'[logo]: http://example.com/image.png "title text"',

				'<figure class="image"><img alt="alt text" src="http://example.com/image.png" title="title text"></img></figure>',

				// Referenced images when converting back are converted to direct links.
				'![alt text](http://example.com/image.png "title text")\n'
			);
		} );

		it( 'should process referenced images without title', () => {
			testDataProcessor(
				'![alt text][logo]\n\n' +
				'[logo]: http://example.com/image.png',

				'<figure class="image"><img alt="alt text" src="http://example.com/image.png"></img></figure>',

				// Referenced images when converting back are converted to direct links.
				'![alt text](http://example.com/image.png)\n'
			);
		} );

		it( 'should process referenced images without alt text', () => {
			testDataProcessor(
				'![][logo]\n\n' +
				'[logo]: http://example.com/image.png "title text"',

				'<figure class="image"><img alt="" src="http://example.com/image.png" title="title text"></img></figure>',

				// Referenced images when converting back are converted to direct links.
				'![](http://example.com/image.png "title text")\n'
			);
		} );
	} );
} );
