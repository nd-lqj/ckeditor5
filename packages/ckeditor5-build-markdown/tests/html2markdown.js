import html2markdown from '../html2markdown';

describe( 'html2markdown', () => {
	it( 'paragraph works', () => {
		expect( html2markdown( '<p>Some text inside a paragraph.</p>' ) ).to.equal( 'Some text inside a paragraph.' );
		expect( html2markdown(
			'<blockquote>\n<p>foo</p><p>bar</p></blockquote>\n'
		) ).to.equal(
			'> foo\n' +
			'> \n' +
			'> bar'
		);
	} );

	it( 'basic-styles work', () => {
		expect( html2markdown( '<p><strong>Test:strong</strong><em>Test:i</em></p>' ) ).to.equal( '**Test:strong**_Test:i_' );
	} );

	it( 'block-quote works', () => {
		expect( html2markdown( '<blockquote>\n<p>Quote</p></blockquote>\n' ) ).to.equal( '> Quote' );
	} );

	it( 'heading works', () => {
		expect( html2markdown(
			'<h2>Heading 1.</h2>\n' +
			'<h3>Heading 1.1</h3>\n' +
			'<h4>Heading 1.1.1</h4>\n' +
			'<h4>Heading 1.1.2</h4>\n' +
			'<h3>Heading 1.2</h3>\n' +
			'<h4>Heading 1.2.1</h4>\n' +
			'<h2>Heading 2</h2>\n'
		) ).to.equal(
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
		expect( html2markdown(
			'<figure class="image"><img src="/assets/sample.png" alt=""/></figure>'
		) ).to.equal(
			'![](/assets/sample.png)'
		);
	} );

	it( 'list works', () => {
		expect( html2markdown(
			'<ul>\n' +
			'<li>Item 1.</li>\n' +
			'<li>Item 2.</li>\n' +
			'</ul>\n' +
			'<ol>\n' +
			'<li>Item 1.</li>\n' +
			'<li>Item 2.</li>\n' +
			'</ol>\n'
		) ).to.equal(
			'* Item 1.\n' +
			'* Item 2.\n' +
			'\n' +
			'1. Item 1.\n' +
			'2. Item 2.'
		);
	} );

	it( 'link works', () => {
		expect( html2markdown(
			'<p><a href="//ckeditor.com">CKEditor.com</a></p>'
		) ).to.equal(
			'[CKEditor.com](//ckeditor.com)'
		);
	} );

	it( 'oembed works #1', () => {
		// not a valid url in providers
		expect( html2markdown(
			'<figure class="media"><a href="//ckeditor.com">!oembed</a></figure>'
		) ).to.equal(
			'[!oembed](//ckeditor.com)'
		);
	} );

	it( 'oembed works #2', () => {
		expect( html2markdown(
			'<figure class="media"><oembed url="https://www.youtube.com/watch?v=H08tGjXNHO4"></oembed></figure>'
		) ).to.equal(
			'[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)'
		);
	} );
} );
