/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { testDataProcessor } from '../_utils/utils';

describe( 'GFMDataProcessor', () => {
	describe( 'oembed', () => {
		it( 'should process oembed', () => {
			testDataProcessor(
				'[!oembed](http://example.com/video.mp4)',

				'<figure class="media"><oembed url="http://example.com/video.mp4"></oembed></figure>'
			);
		} );
	} );
} );
