/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals document */

import CKMD from '../src/ckmd';
import BaseClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { describeMemoryUsage, testMemoryUsage } from '@ckeditor/ckeditor5-core/tests/_utils/memory';

describe( 'CKMD build', () => {
	describe( 'html to markdown', () => {
		let editor, editorElement;

		beforeEach( () => {
			editorElement = document.createElement( 'div' );
			editorElement.innerHTML = '<p><strong>foo</strong> bar</p>';

			document.body.appendChild( editorElement );
		} );

		afterEach( () => {
			editorElement.remove();
			editor = null;
		} );

		describe( 'build', () => {
			it( 'contains plugins', () => {
				expect( CKMD.builtinPlugins ).to.not.be.empty;
			} );

			it( 'contains config', () => {
				expect( CKMD.defaultConfig.toolbar ).to.not.be.empty;
			} );
		} );

		describe( 'create()', () => {
			beforeEach( () => {
				return CKMD.create( editorElement )
					.then( newEditor => {
						editor = newEditor;
					} );
			} );

			afterEach( () => {
				return editor.destroy();
			} );

			it( 'creates an instance which inherits from the CKMD', () => {
				expect( editor ).to.be.instanceof( CKMD );
				expect( editor ).to.be.instanceof( BaseClassicEditor );
			} );

			it( 'loads data from the editor element', () => {
				expect( editor.getData() ).to.equal( '**foo** bar' );
			} );
		} );

		describe( 'destroy()', () => {
			beforeEach( () => {
				return CKMD.create( editorElement )
					.then( newEditor => {
						editor = newEditor;
					} );
			} );

			it( 'sets the data back to the editor element', () => {
				editor.setData( '<p>foo</p>' );

				return editor.destroy()
					.then( () => {
						expect( editorElement.innerHTML ).to.equal( 'foo' );
					} );
			} );

			it( 'restores the editor element', () => {
				expect( editor.sourceElement.style.display ).to.equal( 'none' );

				return editor.destroy()
					.then( () => {
						expect( editor.sourceElement.style.display ).to.equal( '' );
					} );
			} );
		} );

		describe( 'plugins', () => {
			beforeEach( () => {
				return CKMD.create( editorElement )
					.then( newEditor => {
						editor = newEditor;
					} );
			} );

			afterEach( () => {
				return editor.destroy();
			} );

			it( 'paragraph works', () => {
				const data = '<p>Some text inside a paragraph.</p>';

				editor.setData( data );
				expect( editor.getData() ).to.equal( 'Some text inside a paragraph.' );
			} );

			it( 'basic-styles work', () => {
				const data = [
					'<p>',
					'<strong>Test:strong</strong>',
					'<i>Test:i</i>',
					'</p>'
				].join( '' );

				editor.setData( data );
				expect( editor.getData() ).to.equal( '**Test:strong**_Test:i_' );
			} );

			it( 'block-quote works', () => {
				const data = '<blockquote><p>Quote</p></blockquote>';

				editor.setData( data );
				expect( editor.getData() ).to.equal( '> Quote' );
			} );

			it( 'heading works', () => {
				const data = [
					'<h2>Heading 1.</h2>',
					'<h3>Heading 1.1</h3>',
					'<h4>Heading 1.1.1</h4>',
					'<h4>Heading 1.1.2</h4>',
					'<h3>Heading 1.2</h3>',
					'<h4>Heading 1.2.1</h4>',
					'<h2>Heading 2</h2>'
				].join( '' );

				editor.setData( data );
				expect( editor.getData() ).to.equal(
					'## Heading 1.\n\n' +
					'### Heading 1.1\n\n' +
					'#### Heading 1.1.1\n\n' +
					'#### Heading 1.1.2\n\n' +
					'### Heading 1.2\n\n' +
					'#### Heading 1.2.1\n\n' +
					'## Heading 2'
				);
			} );

			it( 'image works', () => {
				const data = '<figure class="image"><img src="/assets/sample.png"></figure>';

				editor.setData( data );
				expect( editor.getData() ).to.equal( '![](/assets/sample.png)' );
			} );

			it( 'list works', () => {
				const data = [
					'<ul>',
					'<li>Item 1.</li>',
					'<li>Item 2.</li>',
					'</ul>',
					'<ol>',
					'<li>Item 1.</li>',
					'<li>Item 2.</li>',
					'</ol>'
				].join( '' );

				editor.setData( data );
				expect( editor.getData() ).to.equal( '* Item 1.\n* Item 2.\n\n1. Item 1.\n2. Item 2.' );
			} );

			it( 'link works', () => {
				editor.setData( '<p><a href="//ckeditor.com">CKEditor.com</a></p>' );
				expect( editor.getData() ).to.equal( '[CKEditor.com](//ckeditor.com)' );
			} );

			it( 'oembed works #1', () => {
				// not a valid url in providers
				editor.setData( '<figure class="media"><oembed url="//ckeditor.com"></oembed></figure>' );
				expect( editor.getData() ).to.equal( '' );
			} );

			it( 'oembed works #2', () => {
				editor.setData( '<figure class="media"><oembed url="https://www.youtube.com/watch?v=H08tGjXNHO4"></oembed></figure>' );
				expect( editor.getData() ).to.equal( '[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)' );
			} );
		} );

		describe( 'config', () => {
			afterEach( () => {
				return editor.destroy();
			} );

			// https://github.com/ckeditor/ckeditor5/issues/572
			it( 'allows configuring toolbar items through config.toolbar', () => {
				return CKMD
					.create( editorElement, {
						toolbar: [ 'bold' ]
					} )
					.then( newEditor => {
						editor = newEditor;

						expect( editor.ui.view.toolbar.items.length ).to.equal( 1 );
					} );
			} );

			// https://github.com/ckeditor/ckeditor5/issues/572
			it( 'allows configuring toolbar offset without overriding toolbar items', () => {
				return CKMD
					.create( editorElement, {
						toolbar: {
							viewportTopOffset: 42
						}
					} )
					.then( newEditor => {
						editor = newEditor;

						expect( editor.ui.view.toolbar.items.length ).to.equal( 32 );
						expect( editor.ui.view.stickyPanel.viewportTopOffset ).to.equal( 42 );
					} );
			} );

			it( 'allows removing built-in toolbar items', () => {
				return CKMD
					.create( editorElement, {
						toolbar: {
							removeItems: [ 'italic' ]
						}
					} )
					.then( newEditor => {
						editor = newEditor;

						expect( editor.ui.view.toolbar.items.length ).to.equal( 31 );
						expect( editor.ui.view.toolbar.items.find( item => item.label === 'Italic' ) ).to.be.undefined;
					} );
			} );
		} );

		describeMemoryUsage( () => {
			testMemoryUsage(
				'should not grow on multiple create/destroy',
				() => CKMD.create( document.querySelector( '#mem-editor' ) ) );
		} );
	} );
} );
