
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class PreserveStyleEditing extends Plugin {
	init() {
		this.editor.config.define('preservestyle', {
			properties: [
				'display',
				'width',
				'height',
				'margin',
				'margin-top',
				'margin-right',
				'margin-bottom',
				'margin-left',
				'padding',
				'padding-top',
				'padding-right',
				'padding-bottom',
				'padding-left',
				'border',
				'border-top',
				'border-right',
				'border-bottom',
				'border-left',
				'border-width',
				'border-style',
				'border-color',
				'border-radius',
				'color',
				'background',
				'background-color',
				'background-image',
				'background-repeat',
				'background-position',
				'background-size',
				'font',
				'font-family',
				'font-size',
				'line-height',
				'text-decoration',
				'text-indent',
				'text-transform',
				'cursor',
			]
		});

		this._defineConverters();
	}

	_defineConverters () {
		const editor = this.editor;
		const properties = editor.config.get('preservestyle.properties');

		properties.forEach((cssProperty) => {
			editor.conversion.for( 'upcast' ).attributeToAttribute( {
				view: {
					styles: {
						[ cssProperty ]: /[\s\S]+/
					}
				},
				model: {
					key: cssProperty,
					value: viewElement => viewElement.getStyle( cssProperty )
				}
			} );

			editor.conversion.for( 'downcast' ).attributeToAttribute( {
				model: cssProperty,
				view: cssValue => ( {
					key: 'style',
					value: {
						[ cssProperty ]: cssValue
					}
				} )
			} );

			editor.conversion.for( 'downcast' ).attributeToElement( {
				model: {
					key: cssProperty,
					name: '$text'
				},
				view: ( cssValue, { writer } ) =>
					writer.createAttributeElement( 'span', {
						style: `${ cssProperty }:${ cssValue }`
					} ),
				converterPriority: 'high'
			} );

			editor.model.schema.setAttributeProperties( cssProperty, {
				isFormatting: true,
				copyOnEnter: false
			} );

			editor.model.schema.extend( '$text', {
				allowAttributes: [ cssProperty ]
			} );

			editor.model.schema.extend( '$block', {
				allowAttributes: [ cssProperty ]
			} );
		});
	}

}
