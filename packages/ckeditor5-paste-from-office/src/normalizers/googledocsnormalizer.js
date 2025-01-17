/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module paste-from-office/normalizers/googledocsnormalizer
 */

import { UpcastWriter } from 'ckeditor5/src/engine';

import removeBoldWrapper from '../filters/removeboldwrapper';
import { unwrapParagraphInListItem } from '../filters/list';
import removeStyle from '../filters/removestyle';

const googleDocsMatch = /id=("|')docs-internal-guid-[-0-9a-f]+("|')/i;

/**
 * Normalizer for the content pasted from Google Docs.
 *
 * @implements module:paste-from-office/normalizer~Normalizer
 */
export default class GoogleDocsNormalizer {
	/**
	 * Creates a new `GoogleDocsNormalizer` instance.
	 *
	 * @param {module:engine/view/document~Document} document View document.
	 */
	constructor( document ) {
		/**
		 * @readonly
		 * @type {module:engine/view/document~Document}
		 */
		this.document = document;
	}

	/**
	 * @inheritDoc
	 */
	isActive( htmlString ) {
		return googleDocsMatch.test( htmlString );
	}

	/**
	 * @inheritDoc
	 */
	execute( data, ensureRemoveStyle ) {
		const writer = new UpcastWriter( this.document );
		const { body: documentFragment } = data._parsedData;

		removeBoldWrapper( documentFragment, writer );
		unwrapParagraphInListItem( documentFragment, writer );

		if (ensureRemoveStyle) {
			removeStyle(documentFragment, writer);
		}

		data.content = documentFragment;
	}
}
