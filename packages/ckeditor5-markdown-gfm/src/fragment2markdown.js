/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/html2markdown
 */

import unified from 'unified';
import { toMdast } from 'hast-util-to-mdast';
import { gfmToMarkdown } from 'mdast-util-gfm';
import { toMarkdown } from 'mdast-util-to-markdown';
import { u } from 'unist-builder';

function toUnified( raw ) {
	if ( !raw ) {
		return raw;
	}

	function handleNode( node ) {
		if ( !node ) {
			return node;
		}

		const properties = {};

		if ( node.getAttributes ) {
			for ( const [ key, value ] of node.getAttributes() ) {
				properties[ key ] = value;
			}
		}

		const children = [];

		if ( node.getChildren ) {
			for ( const child of node.getChildren() ) {
				children.push( handleNode( child ) );
			}
		}

		return {
			type: node.name ? 'element' : 'text',
			tagName: node.name,
			value: node._textData,
			properties,
			children
		};
	}

	return {
		type: 'root',
		children: raw._children ? raw._children.map( handleNode ) : []
	};
}

const processor = unified()
	.use( function parse( options ) {
		this.Parser = ( doc, raw ) => {
			return toMdast( toUnified( raw ), options, this.data( 'document' ) );
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
 * @param {DocumentFragment} fragment
 * @returns {String}
 */
export default function fragment2markdown( fragment, document ) {
	const ret = processor()
		.data( 'document', document )
		.processSync( fragment );

	// console.log( 'fragment2markdown # ret', ret );

	return ret.toString();
}
