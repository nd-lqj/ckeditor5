import markdown2html from '../markdown2html';

describe( 'markdown2html', () => {
	it( 'paragraph works', () => {
		expect( markdown2html( 'Some text inside a paragraph.' ) ).to.equal( '<p>Some text inside a paragraph.</p>' );
	} );

	it( 'basic-styles work', () => {
		expect( markdown2html( '**Test:strong**_Test:i_' ) ).to.equal( '<p><strong>Test:strong</strong><em>Test:i</em></p>' );
	} );

	it( 'block-quote works', () => {
		expect( markdown2html( '> Quote' ) ).to.equal( '<blockquote>\n<p>Quote</p></blockquote>\n' );
		expect( markdown2html(
			'> foo\n' +
			'> \n' +
			'> bar'
		) ).to.equal( '<blockquote>\n<p>foo</p><p>bar</p></blockquote>\n' );
	} );

	it( 'heading works', () => {
		expect( markdown2html(
			'## Heading 1.\n\n' +
			'### Heading 1.1\n\n' +
			'#### Heading 1.1.1\n\n' +
			'#### Heading 1.1.2\n\n' +
			'### Heading 1.2\n\n' +
			'#### Heading 1.2.1\n\n' +
			'## Heading 2'
		) ).to.equal(
			'<h2>Heading 1.</h2>\n' +
			'<h3>Heading 1.1</h3>\n' +
			'<h4>Heading 1.1.1</h4>\n' +
			'<h4>Heading 1.1.2</h4>\n' +
			'<h3>Heading 1.2</h3>\n' +
			'<h4>Heading 1.2.1</h4>\n' +
			'<h2>Heading 2</h2>\n'
		);
	} );

	it( 'image works', () => {
		expect( markdown2html(
			'![](/assets/sample.png)'
		) ).to.equal(
			'<figure class="image"><img src="/assets/sample.png" alt=""/></figure>'
		);
	} );

	it( 'list works', () => {
		expect( markdown2html(
			'* Item 1.\n' +
			'* Item 2.\n' +
			'\n' +
			'1. Item 1.\n' +
			'2. Item 2.'
		) ).to.equal(
			'<ul>\n' +
			'<li>Item 1.</li>\n' +
			'<li>Item 2.</li>\n' +
			'</ul>\n' +
			'<ol>\n' +
			'<li>Item 1.</li>\n' +
			'<li>Item 2.</li>\n' +
			'</ol>\n'
		);
	} );

	it( 'link works', () => {
		expect( markdown2html( '[CKEditor.com](//ckeditor.com)' ) ).to.equal( '<p><a href="//ckeditor.com">CKEditor.com</a></p>' );
	} );

	it( 'oembed works #1', () => {
		// not a valid url in providers
		expect( markdown2html(
			'[!oembed](//ckeditor.com)'
		) ).to.equal(
			'<figure class="media"><a href="//ckeditor.com">!oembed</a></figure>'
		);
	} );

	it( 'oembed works #2', () => {
		expect( markdown2html(
			'[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)'
		) ).to.equal(
			'<figure class="media">' +
				'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
					'<iframe ' +
						'src="https://www.youtube.com/embed/H08tGjXNHO4" ' +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
					'</iframe>' +
				'</div>' +
			'</figure>'
		);
	} );
} );
