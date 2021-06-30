export default function getEmbedUrl( url ) {
	const patterns = [
		/youtube\.com\/watch\?v=([\w-]+)/,
		/youtube\.com\/v\/([\w-]+)/,
		/youtube\.com\/embed\/([\w-]+)/,
		/youtu\.be\/([\w-]+)/
	];

	for ( const pattern of patterns ) {
		const match = url.match( pattern );
		if ( match ) {
			return `https://www.youtube.com/embed/${ match[ 1 ] }`;
		}
	}

	return url;
}
