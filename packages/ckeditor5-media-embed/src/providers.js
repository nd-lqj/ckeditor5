export default [
	{
		name: 'youtube',
		url: [
			/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
			/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
			/^youtube\.com\/embed\/([\w-]+)/,
			/^youtu\.be\/([\w-]+)/
		],
		html: match => {
			const id = match[ 1 ];

			return (
				// 9/16 is 0.5625
				'<div style="position: relative; height: 0; padding-bottom: 56.25%;">' +
					`<iframe src="https://www.youtube.com/embed/${ id }" ` +
						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
					'</iframe>' +
				'</div>'
			);
		}
	}
];
