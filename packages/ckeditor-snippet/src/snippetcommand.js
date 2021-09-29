import Command from '@ckeditor/ckeditor5-core/src/command';

export default class SnippetCommand extends Command {
  execute({ value }) {
    const { editor } = this;
    const { selection } = editor.model.document;

    editor.model.change((writer) => {
      // Create a <snippet> element with the "name" attribute (and all the selection attributes)...
      const snippet = writer.createElement('snippet', {
        ...Object.fromEntries(selection.getAttributes()),
        name: value,
      });

      // ... and insert it into the document.
      editor.model.insertContent(snippet);

      // Put the selection on the inserted element.
      writer.setSelection(snippet, 'on');
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const isAllowed = model.schema.checkChild(
      selection.focus.parent,
      'snippet',
    );

    this.isEnabled = isAllowed;
  }
}
