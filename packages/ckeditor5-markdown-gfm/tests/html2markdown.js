import html2markdown from '../src/html2markdown';

describe( 'html2markdown', () => {
	it( 'escapes works', () => {
		expect( html2markdown(
			',./;\'\\[]<>?:"|{}`-=~!@#$%^&*()_+'
		) ).to.equal(
			',./;\'\\\\\\[]<>?:"|{}\\`-=\\~!@#$%^&\\*()\\_+\n'
		);
	} );

	it( 'paragraph works #1', () => {
		expect( html2markdown(
			'Some text inside a paragraph.'
		) ).to.equal(
			'Some text inside a paragraph.\n'
		);
	} );

	it( 'paragraph works #2', () => {
		expect( html2markdown(
			'<p>Some text inside a paragraph.</p>'
		) ).to.equal(
			'Some text inside a paragraph.\n'
		);
	} );

	it( 'basic-styles work #1', () => {
		expect( html2markdown(
			'<p><strong>Test:strong</strong><em>Test:i</em></p>'
		) ).to.equal(
			'**Test:strong***Test:i*\n'
		);
	} );

	it( 'basic-styles work #2', () => {
		expect( html2markdown(
			'<p><b>Test:strong</b><i>Test:i</i></p>'
		) ).to.equal(
			'**Test:strong***Test:i*\n'
		);
	} );

	it( 'block-quote works #1', () => {
		expect( html2markdown(
			'<blockquote><p>Quote</p></blockquote>'
		) ).to.equal(
			'> Quote\n'
		);
	} );

	it( 'block-quote works #2', () => {
		expect( html2markdown(
			'<blockquote><p>foo</p><p>bar</p></blockquote>'
		) ).to.equal(
			'> foo\n' +
			'>\n' +
			'> bar\n'
		);
	} );

	it( 'block-quote works #3', () => {
		expect( html2markdown(
			'<blockquote><p>foo<br/>bar</p></blockquote>'
		) ).to.equal(
			'> foo\\\n' +
			'> bar\n'
		);
	} );

	it( 'code-block works #1', () => {
		expect( html2markdown(
			'<pre><code>foo\n</code></pre>'
		) ).to.equal(
			'    foo\n'
		);
	} );

	it( 'code-block works #2', () => {
		expect( html2markdown(
			'<pre><code>foo\nbar\n</code></pre>'
		) ).to.equal(
			'    foo\n' +
			'    bar\n'
		);
	} );

	it( 'heading works', () => {
		expect( html2markdown(
			'<h2>Heading 1.</h2>' +
			'<h3>Heading 1.1</h3>' +
			'<h4>Heading 1.1.1</h4>' +
			'<h4>Heading 1.1.2</h4>' +
			'<h3>Heading 1.2</h3>' +
			'<h4>Heading 1.2.1</h4>' +
			'<h2>Heading 2</h2>'
		) ).to.equal(
			'## Heading 1.\n\n' +
			'### Heading 1.1\n\n' +
			'#### Heading 1.1.1\n\n' +
			'#### Heading 1.1.2\n\n' +
			'### Heading 1.2\n\n' +
			'#### Heading 1.2.1\n\n' +
			'## Heading 2\n'
		);
	} );

	it( 'image works #1', () => {
		expect( html2markdown(
			'<figure class="image"><img src="/assets/sample.png" alt="sample"></figure>'
		) ).to.equal(
			'![sample](/assets/sample.png)\n'
		);
	} );

	it( 'image works #2', () => {
		expect( html2markdown(
			'<p>foo <img src="/assets/sample.png" alt="sample"> bar</p>'
		) ).to.equal(
			'foo ![sample](/assets/sample.png) bar\n'
		);
	} );

	it( 'image works #3', () => {
		expect( html2markdown(
			'<img src="/assets/sample.png" alt="sample">'
		) ).to.equal(
			'![sample](/assets/sample.png)\n'
		);
	} );

	it( 'list works #1', () => {
		expect( html2markdown(
			'<ul>' +
				'<li>Item 1.</li>' +
				'<li>Item 2.</li>' +
			'</ul>' +
			'<ol>' +
				'<li>Item 1.</li>' +
				'<li>Item 2.</li>' +
			'</ol>'
		) ).to.equal(
			'*   Item 1.\n' +
			'*   Item 2.\n' +
			'\n' +
			'1.  Item 1.\n' +
			'2.  Item 2.\n'
		);
	} );

	it( 'list works #2', () => {
		expect( html2markdown(
			'<ul>' +
				'<li>Item 1.</li>' +
				'<li>' +
					'<ol>' +
						'<li>Item 1.</li>' +
						'<li>Item 2.</li>' +
					'</ol>' +
				'</li>' +
			'</ul>'
		) ).to.equal(
			'*   Item 1.\n' +
			'*   1.  Item 1.\n' +
			'    2.  Item 2.\n'
		);
	} );

	it( 'link works #1', () => {
		expect( html2markdown(
			'<p><a href="//ckeditor.com">CKEditor.com</a></p>'
		) ).to.equal(
			'[CKEditor.com](//ckeditor.com)\n'
		);
	} );

	it( 'link works #2', () => {
		expect( html2markdown(
			'<a href="//ckeditor.com">CKEditor.com</a>'
		) ).to.equal(
			'[CKEditor.com](//ckeditor.com)\n'
		);
	} );

	it( 'table works #1', () => {
		expect( html2markdown(
			'<figure class="table">' +
				'<table>' +
					'<thead>' +
						'<tr>' +
							'<th>Header 1</th>' +
							'<th>Header 2</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
						'<tr>' +
							'<td>Cell 1</td>' +
							'<td>Cell 2</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Cell 3</td>' +
							'<td>Cell 4</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</figure>'
		) ).to.equal(
			'| Header 1 | Header 2 |\n' +
			'| -------- | -------- |\n' +
			'| Cell 1   | Cell 2   |\n' +
			'| Cell 3   | Cell 4   |\n'
		);
	} );

	it( 'table works #2', () => {
		expect( html2markdown(
			'<figure class="table">' +
				'<table>' +
					'<thead>' +
						'<tr>' +
							'<th align="center">Header 1</th>' +
							'<th align="right">Header 2</th>' +
							'<th align="left">Header 3</th>' +
							'<th>Header 4</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
						'<tr>' +
							'<td align="center">Cell 1</td>' +
							'<td align="right">Cell 2</td>' +
							'<td align="left">Cell 3</td>' +
							'<td>Cell 4</td>' +
						'</tr>' +
						'<tr>' +
							'<td align="center">Cell 5</td>' +
							'<td align="right">Cell 6</td>' +
							'<td align="left">Cell 7</td>' +
							'<td>Cell 8</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</figure>'
		) ).to.equal(
			'| Header 1 | Header 2 | Header 3 | Header 4 |\n' +
			'| :------: | -------: | :------- | -------- |\n' +
			'|  Cell 1  |   Cell 2 | Cell 3   | Cell 4   |\n' +
			'|  Cell 5  |   Cell 6 | Cell 7   | Cell 8   |\n'
		);
	} );

	it( 'table works #3', () => {
		expect( html2markdown(
			'<figure class="table">' +
				'<table>' +
					'<thead>' +
						'<tr>' +
							'<th align="left">Header 1</th>' +
							'<th align="center">Header 2</th>' +
							'<th align="right">Header 3</th>' +
							'<th>Header 4</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
						'<tr>' +
							'<td align="left">' +
								'<em>Cell 1</em>' +
							'</td>' +
							'<td align="center">' +
								'<strong>Cell 2</strong>' +
							'</td>' +
							'<td align="right">' +
								'<del>Cell 3</del>' +
							'</td>' +
							'<td>' +
								'Cell 4' +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</figure>'
		) ).to.equal(
			'| Header 1 |  Header 2  |   Header 3 | Header 4 |\n' +
			'| :------- | :--------: | ---------: | -------- |\n' +
			'| *Cell 1* | **Cell 2** | ~~Cell 3~~ | Cell 4   |\n'
		);
	} );

	it( 'oembed works #1', () => {
		// not a valid url in providers
		expect( html2markdown(
			'<figure class="media"><a href="//ckeditor.com">!oembed</a></figure>'
		) ).to.equal(
			'[!oembed](//ckeditor.com)\n'
		);
	} );

	it( 'oembed works #2', () => {
		expect( html2markdown(
			'<figure class="media"><oembed url="https://www.youtube.com/watch?v=H08tGjXNHO4"></oembed></figure>'
		) ).to.equal(
			'[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)\n'
		);
	} );
} );
