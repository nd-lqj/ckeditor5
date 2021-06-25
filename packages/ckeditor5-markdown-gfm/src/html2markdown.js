/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/html2markdown
 */

import unified from 'unified';
import { fromParse5 } from 'hast-util-from-parse5';
import { toMdast } from 'hast-util-to-mdast';
import { gfmToMarkdown } from 'mdast-util-gfm';
import { toMarkdown } from 'mdast-util-to-markdown';
import { parse as parse5 } from 'parse5';
import { u } from 'unist-builder';

const processor = unified()
	.use( function parse( options ) {
		this.Parser = doc => {
			return fromParse5( parse5( doc, options ) );
		};
	}, {
		scriptingEnabled: false
	} )
	.use( function hast2mdast( options ) {
		return tree => {
			return toMdast( tree, options );
		};
	}, {
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
	.use( function stringify( options ) {
		this.Compiler = tree => {
			return toMarkdown( tree, options );
		};
	}, {
		fences: true,
		join: [ ( left, right, parent ) => {
			if ( parent.spread && ( left.type === 'listItem' || right.type === 'list' ) ) {
				return 0;
			}
		} ],
		rule: '-',
		extensions: [ gfmToMarkdown() ]
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
