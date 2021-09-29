
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import SnippetEditing from './snippetediting';
import SnippetUI from './snippetui';

export default class Snippet extends Plugin {
	static get requires() {
		return [ SnippetEditing, SnippetUI ];
	}

	static get pluginName() {
		return 'Snippet';
	}
}
