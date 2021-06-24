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
import { visit } from 'unist-util-visit';

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
	.use( gfm, {
		singleTilde: false
	} )
	.use( function spread() {
		return transformer;

		function transformer( tree ) {
			visit( tree, [ 'list', 'listItem' ], ( listOrItem, index, parent ) => {
				if ( listOrItem.spread ) {
					parent.children.splice(
						index,
						1,
						{
							...listOrItem,
							spread: false
						}
					);

					return [ visit.SKIP, index ];
				}
			} );
		}
	} )
	.use( stringify, {
		fences: true,
		// join: [ (
		// 	left,
		// 	right,
		// 	parent,
		// 	context
		// ) => {
		// 	return 0;
		// } ],
		rule: '-'
	} )
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
