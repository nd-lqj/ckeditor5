/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/html2markdown
 */

import unified from 'unified';
import parse from 'rehype-parse';
import rehype2remark from 'rehype-remark';
import gfm from 'remark-gfm';
import stringify from 'remark-stringify';
import { u } from 'unist-builder';

const processor = unified()
	.use( parse )
	.use( rehype2remark, {
		handlers: {
			oembed: ( h, node ) => {
				return h(
					node,
					'link',
					{
						url: node.properties.url
					},
					[
						u( 'text', '!oembed' )
					]
				);
			}
		}
	} )
	.use( gfm )
	.use( stringify )
	.freeze();

/**
 * Parses HTML to a markdown.
 *
 * @param {String} html
 * @returns {String}
 */
export default function html2markdown( html ) {
	return processor
		.processSync( html )
		.toString();
}
