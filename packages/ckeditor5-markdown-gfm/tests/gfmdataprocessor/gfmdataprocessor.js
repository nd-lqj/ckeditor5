/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import GFMDataProcessor from '../../src/gfmdataprocessor';
import { StylesProcessor, ViewDocument } from 'ckeditor5/src/engine';

describe( 'GFMDataProcessor', () => {
	let dataProcessor, viewDocument;

	beforeEach( () => {
		viewDocument = new ViewDocument( new StylesProcessor() );
		dataProcessor = new GFMDataProcessor( viewDocument );
	} );

	describe( 'useFillerType()', () => {
		it( 'should have this method to be compatible with `DataProcessor` interface', () => {
			expect( () => {
				dataProcessor.useFillerType( 'default' );
			} ).not.to.throw();
		} );
	} );
} );
