/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals document */

import CKMD from '../src/ckeditor';
import BaseClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { describeMemoryUsage, testMemoryUsage } from '@ckeditor/ckeditor5-core/tests/_utils/memory';

describe( 'CKMD build', () => {
	describe( 'markdown to markdown', () => {
		let editor, editorElement;

		beforeEach( () => {
			editorElement = document.createElement( 'textarea' );
			editorElement.value = '**foo** bar';

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
				expect( editor.getData() ).to.equal( '**foo** bar\n' );
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
				editor.setData( 'foo' );

				return editor.destroy()
					.then( () => {
						expect( editorElement.innerHTML ).to.equal( 'foo\n' );
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
				const data = 'Some text inside a paragraph.';

				editor.setData( data );
				expect( editor.getData() ).to.equal( 'Some text inside a paragraph.\n' );
			} );

			it( 'basic-styles work', () => {
				editor.setData( '**Test:strong**_Test:i_' );
				expect( editor.getData() ).to.equal( '**Test:strong***Test:i*\n' );
			} );

			it( 'block-quote works', () => {
				editor.setData( '> Quote' );
				expect( editor.getData() ).to.equal( '> Quote\n' );
			} );

			it( 'heading works', () => {
				editor.setData(
					'## Heading 1.\n\n' +
					'### Heading 1.1\n\n' +
					'#### Heading 1.1.1\n\n' +
					'#### Heading 1.1.2\n\n' +
					'### Heading 1.2\n\n' +
					'#### Heading 1.2.1\n\n' +
					'## Heading 2'
				);
				expect( editor.getData() ).to.equal(
					'## Heading 1.\n\n' +
					'### Heading 1.1\n\n' +
					'#### Heading 1.1.1\n\n' +
					'#### Heading 1.1.2\n\n' +
					'### Heading 1.2\n\n' +
					'#### Heading 1.2.1\n\n' +
					'## Heading 2\n'
				);
			} );

			it( 'image works', () => {
				editor.setData( '![](/assets/sample.png)' );
				expect( editor.getData() ).to.equal( '![](/assets/sample.png)\n' );
			} );

			it( 'list works', () => {
				editor.setData( '* Item 1.\n* Item 2.\n\n1. Item 1.\n2. Item 2.' );
				expect( editor.getData() ).to.equal( '*   Item 1.\n*   Item 2.\n\n1.  Item 1.\n2.  Item 2.\n' );
			} );

			it( 'link works', () => {
				editor.setData( '[CKEditor.com](//ckeditor.com)' );
				expect( editor.getData() ).to.equal( '[CKEditor.com](//ckeditor.com)\n' );
			} );

			it( 'oembed works #1', () => {
				// not a valid url in providers
				editor.setData( '[!oembed](//ckeditor.com)' );
				expect( editor.getData() ).to.equal( '' );
			} );

			it( 'oembed works #2', () => {
				editor.setData( '[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)' );
				expect( editor.getData() ).to.equal( '[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)\n' );
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

						expect( editor.ui.view.toolbar.items.length ).to.equal( 31 );
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

						expect( editor.ui.view.toolbar.items.length ).to.equal( 30 );
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
