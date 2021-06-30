
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import DocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment';
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import ViewText from '@ckeditor/ckeditor5-engine/src/view/text';

export function toFragment( tree, options, document ) {
	function transformClassName( { className, ...properties } ) {
		return className ? {
			...properties,
			class: className
		} : properties;
	}

	function handleNode( node ) {
		if ( node.type === 'text' ) {
			return new ViewText( document, node.value );
		}

		return new ViewElement(
			document, node.tagName, transformClassName( node.properties ), node.children ? node.children.map( handleNode ) : []
		);
	}

	return new DocumentFragment( document, tree.children.map( handleNode ) );
}
