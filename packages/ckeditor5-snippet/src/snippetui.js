
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import snippetIcon from '../theme/icons/snippet.svg';

export default class SnippetUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;
		const prefix = editor.config.get( 'snippet.prefix' );
		const suffix = editor.config.get( 'snippet.suffix' );
		const snippetNames = editor.config.get( 'snippet.types' );

		// The "snippet" dropdown must be registered among the UI components of the editor
		// to be displayed in the toolbar.
		editor.ui.componentFactory.add( 'snippet', locale => {
			const dropdownView = createDropdown( locale );

			// Populate the list in the dropdown with items.
			addListToDropdown( dropdownView, getDropdownItemsDefinitions( snippetNames, prefix, suffix ) );

			dropdownView.buttonView.set( {
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t( 'Snippet' ),
				icon: snippetIcon,
				tooltip: true,
				withText: true
			} );

			// Disable the snippet button when the command is disabled.
			const command = editor.commands.get( 'snippet' );
			dropdownView.bind( 'isEnabled' ).to( command );

			// Execute the command when the dropdown item is clicked (executed).
			this.listenTo( dropdownView, 'execute', evt => {
				editor.execute( 'snippet', { value: evt.source.commandParam } );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}
}

function getDropdownItemsDefinitions( snippetNames, prefix, suffix ) {
	const itemDefinitions = new Collection();

	for ( const name of snippetNames ) {
		const definition = {
			type: 'button',
			model: new Model( {
				commandParam: name,
				label: prefix + name + suffix,
				withText: true
			} )
		};

		// Add the item definition to the collection.
		itemDefinitions.add( definition );
	}

	return itemDefinitions;
}
