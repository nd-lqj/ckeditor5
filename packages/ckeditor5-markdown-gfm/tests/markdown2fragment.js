import markdown2fragment from '../src/markdown2fragment';

describe( 'markdown2fragment', () => {
	it( 'escapes works', () => {
		expect( markdown2fragment(
			',./;\'\\[]<>?:"|{}`-=~!@#$%^&*()_+'
		) ).to.equal(
			'<p>,./;\'[]&#x3C;>?:"|{}`-=~!@#$%^&#x26;*()_+</p>'
		);
	} );

	it( 'paragraph works #1', () => {
		expect( markdown2fragment(
			'Some text inside a paragraph.'
		) ).to.equal(
			'<p>Some text inside a paragraph.</p>'
		);
	} );

	it( 'paragraph works #2', () => {
		expect( markdown2fragment(
			'Some text inside a paragraph.\n'
		) ).to.equal(
			'<p>Some text inside a paragraph.</p>'
		);
	} );

	it( 'horizontal-rule work #1', () => {
		expect( markdown2fragment(
			'---'
		) ).to.equal(
			'<hr>'
		);
	} );

	it( 'horizontal-rule work #2', () => {
		expect( markdown2fragment(
			'***'
		) ).to.equal(
			'<hr>'
		);
	} );

	it( 'basic-styles work #1', () => {
		expect( markdown2fragment(
			'**Test:strong**_Test:i_'
		) ).to.equal(
			'<p><strong>Test:strong</strong><em>Test:i</em></p>'
		);
	} );

	it( 'basic-styles work #2', () => {
		expect( markdown2fragment(
			'**Test:strong***Test:i*'
		) ).to.equal(
			'<p><strong>Test:strong</strong><em>Test:i</em></p>'
		);
	} );

	it( 'block-quote works #1', () => {
		expect( markdown2fragment(
			'> Quote'
		) ).to.equal(
			'<blockquote>\n<p>Quote</p>\n</blockquote>'
		);
	} );

	it( 'block-quote works #2', () => {
		expect( markdown2fragment(
			'> foo\n' +
			'>\n' +
			'> bar'
		) ).to.equal(
			'<blockquote>\n<p>foo</p>\n<p>bar</p>\n</blockquote>'
		);
	} );

	it( 'block-quote works #3', () => {
		expect( markdown2fragment(
			'> foo\n' +
			'> bar\n'
		) ).to.equal(
			'<blockquote>\n<p>foo\nbar</p>\n</blockquote>'
		);
	} );

	it( 'code-block works #1', () => {
		expect( markdown2fragment(
			'\tfoo'
		) ).to.equal(
			'<pre><code>foo\n</code></pre>'
		);
	} );

	it( 'code-block works #2', () => {
		expect( markdown2fragment(
			'\tfoo\n' +
			'\tbar\n'
		) ).to.equal(
			'<pre><code>foo\nbar\n</code></pre>'
		);
	} );

	it( 'heading works', () => {
		expect( markdown2fragment(
			'## Heading 1.\n\n' +
			'### Heading 1.1\n' +
			'#### Heading 1.1.1\n\n' +
			'#### Heading 1.1.2\n' +
			'### Heading 1.2\n\n\n' +
			'#### Heading 1.2.1\n\n' +
			'## Heading 2'
		) ).to.equal(
			'<h2>Heading 1.</h2>\n' +
			'<h3>Heading 1.1</h3>\n' +
			'<h4>Heading 1.1.1</h4>\n' +
			'<h4>Heading 1.1.2</h4>\n' +
			'<h3>Heading 1.2</h3>\n' +
			'<h4>Heading 1.2.1</h4>\n' +
			'<h2>Heading 2</h2>'
		);
	} );

	it( 'image works #1', () => {
		expect( markdown2fragment(
			'![](/assets/sample.png)'
		) ).to.equal(
			'<figure class="image">\n<img src="/assets/sample.png" alt="">\n</figure>'
		);
	} );

	it( 'image works #2', () => {
		expect( markdown2fragment(
			'foo ![](/assets/sample.png) bar'
		) ).to.equal(
			'<p>foo <img src="/assets/sample.png" alt=""> bar</p>'
		);
	} );

	it( 'image works #3', () => {
		expect( markdown2fragment(
			'![](/assets/sample.png)'
		) ).to.equal(
			'<figure class="image">\n<img src="/assets/sample.png" alt="">\n</figure>'
		);
	} );

	it( 'image works #4', () => {
		expect( markdown2fragment(
			'[![](/assets/sample.png)](/assets/sample.png)'
		) ).to.equal(
			'<figure class="image">\n<a href="/assets/sample.png"><img src="/assets/sample.png" alt=""></a>\n</figure>'
		);
	} );

	it( 'list works #1', () => {
		expect( markdown2fragment(
			'*   Item 1.\n' +
			'*   Item 2.\n' +
			'\n' +
			'1.  Item 1.\n' +
			'2.  Item 2.\n'
		) ).to.equal(
			'<ul>\n' +
				'<li>Item 1.</li>\n' +
				'<li>Item 2.</li>\n' +
			'</ul>\n' +
			'<ol>\n' +
				'<li>Item 1.</li>\n' +
				'<li>Item 2.</li>\n' +
			'</ol>'
		);
	} );

	it( 'list works #2', () => {
		expect( markdown2fragment(
			'*   Item 1.\n' +
			'*   1.  Item 1.\n' +
			'    2.  Item 2.\n'
		) ).to.equal(
			'<ul>\n' +
				'<li>Item 1.</li>\n' +
				'<li>\n' +
					'<ol>\n' +
						'<li>Item 1.</li>\n' +
						'<li>Item 2.</li>\n' +
					'</ol>\n' +
				'</li>\n' +
			'</ul>'
		);
	} );

	it( 'list works #3', () => {
		expect( markdown2fragment(
			'1.  Soyuz (Soviet/Russian)\n' +
			'	1.  Early stage (all retired)\n' +
			'		*   7K-OK\n' +
			'		*   7KT-OK\n' +
			'		*   7K-T\n' +
			'		*   7K-TM\n' +
			'	2.  Soyuz T (retired)\n' +
			'	3.  Soyuz TM (retired)\n' +
			'	4.  Soyuz TMA (retired)\n' +
			'	5.  Soyuz TMA-M (retired)\n' +
			'	6.  Soyuz MS\n' +
			'2.  STS orbiter (American; all retired)\n' +
			'	*   Columbia\n' +
			'	*   Challenger\n' +
			'	*   Discovery\n' +
			'	*   Atlantis\n' +
			'	*   Endeavour\n' +
			'3.  SpaceX Crew Dragon (American)\n' +
			'4.  Shenzhou (Chinese)'
		) ).to.equal(
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
		);
	} );

	it( 'link works #1', () => {
		expect( markdown2fragment(
			'[CKEditor.com](//ckeditor.com)'
		) ).to.equal(
			'<p><a href="//ckeditor.com">CKEditor.com</a></p>'
		);
	} );

	it( 'link works #2', () => {
		expect( markdown2fragment(
			'[CKEditor.com](//ckeditor.com)\n'
		) ).to.equal(
			'<p><a href="//ckeditor.com">CKEditor.com</a></p>'
		);
	} );

	it( 'table works #1', () => {
		expect( markdown2fragment(
			'| Header 1 | Header 2 |\n' +
			'| -------- | -------- |\n' +
			'| Cell 1   | Cell 2   |\n' +
			'| Cell 3   | Cell 4   |\n'
		) ).to.equal(
			'<figure class="table">\n' +
				'<table>\n' +
					'<thead>\n' +
						'<tr>\n' +
							'<th>Header 1</th>\n' +
							'<th>Header 2</th>\n' +
						'</tr>\n' +
					'</thead>\n' +
					'<tbody>\n' +
						'<tr>\n' +
							'<td>Cell 1</td>\n' +
							'<td>Cell 2</td>\n' +
						'</tr>\n' +
						'<tr>\n' +
							'<td>Cell 3</td>\n' +
							'<td>Cell 4</td>\n' +
						'</tr>\n' +
					'</tbody>\n' +
				'</table>\n' +
			'</figure>'
		);
	} );

	it( 'table works #2', () => {
		expect( markdown2fragment(
			'| Header 1 | Header 2 | Header 3 | Header 4 |\n' +
			'| :------: | -------: | :------- | -------- |\n' +
			'|  Cell 1  |   Cell 2 | Cell 3   | Cell 4   |\n' +
			'|  Cell 5  |   Cell 6 | Cell 7   | Cell 8   |\n'
		) ).to.equal(
			'<figure class="table">\n' +
				'<table>\n' +
					'<thead>\n' +
						'<tr>\n' +
							'<th align="center">Header 1</th>\n' +
							'<th align="right">Header 2</th>\n' +
							'<th align="left">Header 3</th>\n' +
							'<th>Header 4</th>\n' +
						'</tr>\n' +
					'</thead>\n' +
					'<tbody>\n' +
						'<tr>\n' +
							'<td align="center">Cell 1</td>\n' +
							'<td align="right">Cell 2</td>\n' +
							'<td align="left">Cell 3</td>\n' +
							'<td>Cell 4</td>\n' +
						'</tr>\n' +
						'<tr>\n' +
							'<td align="center">Cell 5</td>\n' +
							'<td align="right">Cell 6</td>\n' +
							'<td align="left">Cell 7</td>\n' +
							'<td>Cell 8</td>\n' +
						'</tr>\n' +
					'</tbody>\n' +
				'</table>\n' +
			'</figure>'
		);
	} );

	it( 'table works #3', () => {
		expect( markdown2fragment(
			'| Header 1 |  Header 2  |   Header 3 | Header 4 |\n' +
			'| :------- | :--------: | ---------: | -------- |\n' +
			'| *Cell 1* | **Cell 2** | ~~Cell 3~~ | Cell 4   |\n'
		) ).to.equal(
			'<figure class="table">\n' +
				'<table>\n' +
					'<thead>\n' +
						'<tr>\n' +
							'<th align="left">Header 1</th>\n' +
							'<th align="center">Header 2</th>\n' +
							'<th align="right">Header 3</th>\n' +
							'<th>Header 4</th>\n' +
						'</tr>\n' +
					'</thead>\n' +
					'<tbody>\n' +
						'<tr>\n' +
							'<td align="left"><em>Cell 1</em></td>\n' +
							'<td align="center"><strong>Cell 2</strong></td>\n' +
							'<td align="right"><del>Cell 3</del></td>\n' +
							'<td>Cell 4</td>\n' +
						'</tr>\n' +
					'</tbody>\n' +
				'</table>\n' +
			'</figure>'
		);
	} );

	it( 'oembed works #1', () => {
		// not a valid url in providers
		expect( markdown2fragment(
			'[!oembed](//ckeditor.com)'
		) ).to.equal(
			'<figure class="media">\n<oembed url="//ckeditor.com"></oembed>\n</figure>'
		);
	} );

	it( 'oembed works #2', () => {
		expect( markdown2fragment(
			'[!oembed](https://www.youtube.com/watch?v=H08tGjXNHO4)'
		) ).to.equal(
			'<figure class="media">\n<oembed url="https://www.youtube.com/watch?v=H08tGjXNHO4"></oembed>\n</figure>'
		);
	} );
} );
