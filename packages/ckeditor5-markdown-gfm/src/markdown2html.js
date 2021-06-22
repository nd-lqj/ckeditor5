/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/markdown2html
 */

import unified from 'unified';
import stringify from 'rehype-stringify';
import gfm from 'remark-gfm';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { u } from 'unist-builder';
import { visit } from 'unist-util-visit';

const processor = unified()
	.use( parse )
	.use( gfm )
	.use( function figuretable( ) {
		return transformer;

		function transformer( tree ) {
			visit( tree, 'table', ( table, index, parent ) => {
				if ( parent.type !== 'figure' ) {
					parent.children.splice(
						index,
						1,
						u( 'figure', { class: 'table' }, [
							u( 'text', '\n' ),
							table,
							u( 'text', '\n' )
						] )
					);

					return [ visit.SKIP, index ];
				}
			} );
		}
	} )
	.use( function figureoembed( ) {
		return transformer;

		function transformer( tree ) {
			visit( tree, 'paragraph', ( paragraph, index, parent ) => {
				if ( paragraph.children.length !== 1 ) {
					return;
				}

				let target = paragraph.children[ 0 ];

				if ( target.type === 'link' ) {
					if ( target.children.length !== 1 ) {
						return;
					}

					const url = target.url;

					target = target.children[ 0 ];

					if ( target.type === 'text' && target.value === '!oembed' ) {
						parent.children.splice(
							index,
							1,
							u( 'figure', { class: 'media' }, [
								u( 'text', '\n' ),
								u( 'oembed', { url } ),
								u( 'text', '\n' )
							] ) );

						return [ visit.SKIP, index ];
					}
				}
			} );
		}
	} )
	.use( function figureimage( ) {
		return transformer;

		function transformer( tree ) {
			visit( tree, 'paragraph', ( paragraph, index, parent ) => {
				if ( paragraph.children.length !== 1 ) {
					return;
				}

				let target = paragraph.children[ 0 ];

				if ( target.type === 'image' ) {
					parent.children.splice(
						index,
						1,
						u( 'figure', { class: 'image' }, [
							u( 'text', '\n' ),
							...paragraph.children,
							u( 'text', '\n' )
						] ) );

					return [ visit.SKIP, index ];
				}

				if ( target.type === 'link' ) {
					if ( target.children.length !== 1 ) {
						return;
					}

					target = target.children[ 0 ];

					if ( target.type === 'image' ) {
						parent.children.splice(
							index,
							1,
							u( 'figure', { class: 'image' }, [
								u( 'text', '\n' ),
								...paragraph.children,
								u( 'text', '\n' )
							] ) );

						return [ visit.SKIP, index ];
					}
				}
			} );
		}
	} )
	.use( remark2rehype, {
		handlers: {
			figure: ( h, node ) => {
				return h( node, 'figure', { class: node.class }, all( h, node ) );
			},
			oembed: ( h, node ) => {
				return h( node, 'oembed', { url: node.url } );
			}
		}
	} )
	.use( stringify )
	.freeze();

/**
 * Parses markdown string to an HTML.
 *
 * @param {String} markdown
 * @returns {String}
 */
export default function markdown2html( markdown ) {
	return processor
		.processSync( markdown )
		.toString();
}
