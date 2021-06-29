import fragment2markdown from '../src/fragment2markdown';

describe( 'fragment2markdown', () => {
	it( 'escapes works', () => {
		expect( fragment2markdown(
			',./;\'\\[]<>?:"|{}`-=~!@#$%^&*()_+'
		) ).to.equal(
			',./;\'\\\\\\[]<>?:"|{}\\`-=\\~!@#$%^&\\*()\\_+\n'
		);
	} );

	it( 'paragraph works #1', () => {
		expect( fragment2markdown(
			'Some text inside a paragraph.'
		) ).to.equal(
			'Some text inside a paragraph.\n'
		);
	} );

	it( 'paragraph works #2', () => {
		expect( fragment2markdown(
			'<p>Some text inside a paragraph.</p>'
		) ).to.equal(
			'Some text inside a paragraph.\n'
		);
	} );

	it( 'horizontal-rule work #1', () => {
		expect( fragment2markdown(
			'<hr/>'
		) ).to.equal(
			'---\n'
		);
	} );

	it( 'horizontal-rule work #2', () => {
		expect( fragment2markdown(
			'<hr>'
		) ).to.equal(
			'---\n'
		);
	} );

	it( 'basic-styles work #1', () => {
		expect( fragment2markdown(
			'<p><strong>Test:strong</strong><em>Test:i</em></p>'
		) ).to.equal(
			'**Test:strong***Test:i*\n'
		);
	} );

	it( 'basic-styles work #2', () => {
		expect( fragment2markdown(
			'<p><b>Test:strong</b><i>Test:i</i></p>'
		) ).to.equal(
			'**Test:strong***Test:i*\n'
		);
	} );

	it( 'block-quote works #1', () => {
		expect( fragment2markdown(
			'<blockquote><p>Quote</p></blockquote>'
		) ).to.equal(
			'> Quote\n'
		);
	} );

	it( 'block-quote works #2', () => {
		expect( fragment2markdown(
			'<blockquote><p>foo</p><p>bar</p></blockquote>'
		) ).to.equal(
			'> foo\n' +
			'>\n' +
			'> bar\n'
		);
	} );

	it( 'block-quote works #3', () => {
		expect( fragment2markdown(
			'<blockquote><p>foo<br/>bar</p></blockquote>'
		) ).to.equal(
			'> foo\\\n' +
			'> bar\n'
		);
	} );

	it( 'code-block works #1', () => {
		expect( fragment2markdown(
			'<pre><code>\tfoo\n</code></pre>'
		) ).to.equal(
			'```\n' +
			'\tfoo\n' +
			'```\n'
		);
	} );

	it( 'code-block works #2', () => {
		expect( fragment2markdown(
			'<pre><code>foo\nbar\n</code></pre>'
		) ).to.equal(
			'```\n' +
			'foo\n' +
			'bar\n' +
			'```\n'
		);
	} );

	it( 'heading works', () => {
		expect( fragment2markdown(
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
		expect( fragment2markdown(
			'<figure class="image"><img src="/assets/sample.png" alt="sample"></figure>'
		) ).to.equal(
			'![sample](/assets/sample.png)\n'
		);
	} );

	it( 'image works #2', () => {
		expect( fragment2markdown(
			'<p>foo <img src="/assets/sample.png" alt="sample"> bar</p>'
		) ).to.equal(
			'foo ![sample](/assets/sample.png) bar\n'
		);
	} );

	it( 'image works #3', () => {
		expect( fragment2markdown(
			'<img src="/assets/sample.png" alt="sample">'
		) ).to.equal(
			'![sample](/assets/sample.png)\n'
		);
	} );

	it( 'list works #1', () => {
		expect( fragment2markdown(
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
		expect( fragment2markdown(
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

	it( 'list works #3', () => {
		expect( fragment2markdown(
			'<ol>\n' +
				'<li>Soyuz (Soviet/Russian)\n' +
					'<ol>\n' +
						'<li>Early stage (all retired)\n' +
							'<ul>\n' +
								'<li>7K-OK</li>\n' +
								'<li>7KT-OK</li>\n' +
								'<li>7K-T</li>\n' +
								'<li>7K-TM</li>\n' +
							'</ul>\n' +
						'</li>\n' +
						'<li>Soyuz T (retired)</li>\n' +
						'<li>Soyuz TM (retired)</li>\n' +
						'<li>Soyuz TMA (retired)</li>\n' +
						'<li>Soyuz TMA-M (retired)</li>\n' +
						'<li>Soyuz MS</li>\n' +
					'</ol>\n' +
				'</li>\n' +
				'<li>STS orbiter (American; all retired)\n' +
					'<ul>\n' +
						'<li>Columbia</li>\n' +
						'<li>Challenger</li>\n' +
						'<li>Discovery</li>\n' +
						'<li>Atlantis</li>\n' +
						'<li>Endeavour</li>\n' +
					'</ul>\n' +
				'</li>\n' +
				'<li>SpaceX Crew Dragon (American)</li>\n' +
				'<li>Shenzhou (Chinese)</li>\n' +
			'</ol>'
		) ).to.equal(
			'1.  Soyuz (Soviet/Russian)\n' +
			'    1.  Early stage (all retired)\n' +
			'        *   7K-OK\n' +
			'        *   7KT-OK\n' +
			'        *   7K-T\n' +
			'        *   7K-TM\n' +
			'    2.  Soyuz T (retired)\n' +
			'    3.  Soyuz TM (retired)\n' +
			'    4.  Soyuz TMA (retired)\n' +
			'    5.  Soyuz TMA-M (retired)\n' +
			'    6.  Soyuz MS\n' +
			'2.  STS orbiter (American; all retired)\n' +
			'    *   Columbia\n' +
			'    *   Challenger\n' +
			'    *   Discovery\n' +
			'    *   Atlantis\n' +
			'    *   Endeavour\n' +
			'3.  SpaceX Crew Dragon (American)\n' +
			'4.  Shenzhou (Chinese)\n'
		);
	} );

	it( 'link works #1', () => {
		expect( fragment2markdown(
			'<p><a href="//ckeditor.com">CKEditor.com</a></p>'
		) ).to.equal(
			'[CKEditor.com](//ckeditor.com)\n'
		);
	} );

	it( 'link works #2', () => {
		expect( fragment2markdown(
			'<a href="//ckeditor.com">CKEditor.com</a>'
		) ).to.equal(
			'[CKEditor.com](//ckeditor.com)\n'
		);
	} );

	it( 'table works #1', () => {
		expect( fragment2markdown(
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
		expect( fragment2markdown(
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
		expect( fragment2markdown(
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
		expect( fragment2markdown(
			'<figure class="media"><a href="//ckeditor.com">!oembed</a></figure>'
		) ).to.equal(
			'[!oembed](//ckeditor.com)\n'
		);
	} );

	it( 'oembed works #2', () => {
		expect( fragment2markdown(
			'<figure class="media"><oembed url="https://www.youtube.com/watch?v=H08tGjXNHO4"></oembed></figure>'
		) ).to.equal(
			'[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)\n'
		);
	} );
} );
