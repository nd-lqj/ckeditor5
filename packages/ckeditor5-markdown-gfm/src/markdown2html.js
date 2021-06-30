/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module markdown-gfm/markdown2html
 */

import unified from 'unified';
import { toHtml } from 'hast-util-to-html';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';
import { toHast, all } from 'mdast-util-to-hast';
import { u } from 'unist-builder';
import { visit } from 'unist-util-visit';
import getEmbedUrl from './getEmbedUrl';

const processor = unified()
	.use( function parse( options ) {
		this.Parser = doc => {
			return fromMarkdown( doc, options );
		};
	}, {
		extensions: [ gfm( {
			singleTilde: true
		} ) ],
		mdastExtensions: [ gfmFromMarkdown ]
	} )
	.use( function table( ) {
		return tree => {
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
		};
	} )
	.use( function image( ) {
		return tree => {
			visit( tree, 'paragraph', ( paragraph, index, parent ) => {
				if ( paragraph.children.length !== 1 ) {
					return;
				}

				let match = false;
				let target = paragraph.children[ 0 ];

				if ( target.type === 'image' || target.type === 'imageReference' ) {
					match = true;
				}

				if ( target.type === 'link' ) {
					if ( target.children.length !== 1 ) {
						return;
					}

					target = target.children[ 0 ];

					if ( target.type === 'image' || target.type === 'imageReference' ) {
						match = true;
					}
				}

				if ( match ) {
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
			} );
		};
	} )
	.use( function oembed( ) {
		return tree => {
			const semanticOembed = this.data( 'semanticOembed' );

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
							u( 'figure', { class: 'media' }, semanticOembed ? [
								u( 'text', '\n' ),
								u( 'oembed', { url } ),
								u( 'text', '\n' )
							] : [
								u( 'text', '\n' ),
								u( 'html', '<div style="position: relative; height: 0; padding-bottom: 56.25%;">' +
									`<iframe src="${ getEmbedUrl( url ) }" ` +
										'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
										'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
									'</iframe>' +
								'</div>' ),
								u( 'text', '\n' )
							] ) );

						return [ visit.SKIP, index ];
					}
				}
			} );
		};
	} )
	.use( function mdast2hast( options ) {
		return tree => {
			return toHast( tree, options );
		};
	}, {
		allowDangerousHtml: true,
		handlers: {
			figure: ( h, node ) => {
				return h( node, 'figure', { class: node.class }, all( h, node ) );
			},
			oembed: ( h, node ) => {
				return h( node, 'oembed', { url: node.url } );
			}
		}
	} )
	.use( function stringify( options ) {
		this.Compiler = tree => {
			return toHtml( tree, options );
		};
	}, {
		allowDangerousHtml: true
	} )
	.freeze();

/**
 * Parses markdown string to HTML string.
 *
 * @param {String} markdown
 * @param {{ semanticOembed?: boolean }} options
 * @returns {String}
 */
export default function markdown2html( markdown, options = {} ) {
	return processor()
		.data( options )
		.processSync( markdown )
		.toString();
}
