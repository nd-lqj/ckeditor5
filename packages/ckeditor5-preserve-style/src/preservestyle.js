
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import PreserveStyleEditing from './preservestyleediting';

export default class PreserveStyle extends Plugin {
	static get requires() {
		return [ PreserveStyleEditing ];
	}

	static get pluginName() {
		return 'PreserveStyle';
	}
}
