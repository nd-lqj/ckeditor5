import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class StylePreserve extends Plugin {
  static get pluginName() {
    return 'StylePreserve';
  }

  constructor(editor) {
    super(editor);
    preserve(editor, 'display');
    preserve(editor, 'width');
    preserve(editor, 'height');
    preserve(editor, 'margin');
    preserve(editor, 'margin-top');
    preserve(editor, 'margin-right');
    preserve(editor, 'margin-bottom');
    preserve(editor, 'margin-left');
    preserve(editor, 'padding');
    preserve(editor, 'padding-top');
    preserve(editor, 'padding-right');
    preserve(editor, 'padding-bottom');
    preserve(editor, 'padding-left');
    preserve(editor, 'border');
    preserve(editor, 'border-top');
    preserve(editor, 'border-right');
    preserve(editor, 'border-bottom');
    preserve(editor, 'border-left');
    preserve(editor, 'border-width');
    preserve(editor, 'border-style');
    preserve(editor, 'border-color');
    preserve(editor, 'border-radius');
    preserve(editor, 'color');
    preserve(editor, 'background');
    preserve(editor, 'background-color');
    preserve(editor, 'background-image');
    preserve(editor, 'background-repeat');
    preserve(editor, 'background-position');
    preserve(editor, 'background-size');
    preserve(editor, 'font');
    preserve(editor, 'font-family');
    preserve(editor, 'font-size');
    preserve(editor, 'line-height');
    // preserve(editor, 'text-align');
    preserve(editor, 'text-decoration');
    preserve(editor, 'text-indent');
    preserve(editor, 'text-transform');
    preserve(editor, 'cursor');
  }
}

function preserve(editor, cssProperty) {
  editor.conversion.for('upcast').attributeToAttribute({
    view: {
      styles: {
        [cssProperty]: /[\s\S]+/,
      },
    },
    model: {
      key: cssProperty,
      value: (viewElement) => viewElement.getStyle(cssProperty),
    },
  });

  editor.conversion.for('downcast').attributeToAttribute({
    model: cssProperty,
    view: (cssValue) => ({
      key: 'style',
      value: {
        [cssProperty]: cssValue,
      },
    }),
  });

  editor.conversion.for('downcast').attributeToElement({
    model: {
      key: cssProperty,
      name: '$text',
    },
    view: (cssValue, { writer }) =>
      writer.createAttributeElement('span', {
        style: `${cssProperty}:${cssValue}`,
      }),
    converterPriority: 'high',
  });

  editor.model.schema.setAttributeProperties(cssProperty, {
    isFormatting: true,
    copyOnEnter: false,
  });

  editor.model.schema.extend('$text', {
    allowAttributes: [cssProperty],
  });

  editor.model.schema.extend('$block', {
    allowAttributes: [cssProperty],
  });
}
