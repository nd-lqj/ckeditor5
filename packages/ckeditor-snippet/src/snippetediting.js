import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import SnippetCommand from './snippetcommand';

import '../theme/snippet.css';

export default class SnippetEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('snippet', new SnippetCommand(this.editor));

    this.editor.editing.mapper.on(
      'viewToModelPosition',
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass('snippet'),
      ),
    );
    this.editor.config.define('snippet', {
      types: [],
    });
  }

  _defineSchema() {
    const { schema } = this.editor.model;

    schema.register('snippet', {
      // Allow wherever text is allowed:
      allowWhere: '$text',

      // The snippet will act as an inline node:
      isInline: true,

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // The inline widget can have the same attributes as text (for example linkHref, bold).
      allowAttributesOf: '$text',

      // The snippet can have many types, like date, name, surname, etc:
      allowAttributes: ['name'],
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: ['snippet'],
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Extract the "name" from "${name}".
        const name = viewElement.getChild(0).data.slice(2, -1);

        return modelWriter.createElement('snippet', { name });
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'snippet',
      view: (modelItem, { writer: viewWriter }) => {
        const widgetElement = createSnippetView(modelItem, viewWriter);

        // Enable widget handling on a snippet element inside the editing view.
        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'snippet',
      view: (modelItem, { writer: viewWriter }) =>
        createSnippetView(modelItem, viewWriter),
    });
  }
}

// Helper method for both downcast converters.
function createSnippetView(modelItem, viewWriter) {
  const name = modelItem.getAttribute('name');

  const snippetView = viewWriter.createContainerElement(
    'span',
    {
      class: 'snippet',
    },
    {
      isAllowedInsideAttributeElement: true,
    },
  );

  // Insert the snippet name (as a text).
  const innerText = viewWriter.createText(`\${${name}}`);

  viewWriter.insert(viewWriter.createPositionAt(snippetView, 0), innerText);

  return snippetView;
}
