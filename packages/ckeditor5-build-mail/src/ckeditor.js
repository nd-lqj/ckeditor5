/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PreserveStyle from '@ckeditor/ckeditor5-preserve-style/src/preservestyle';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Snippet from '@ckeditor/ckeditor5-snippet/src/snippet';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

// Plugins to include in the build.
const builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	Font,
	Heading,
	HeadingButtonsUI,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Italic,
	Link,
	LinkImage,
	List,
	MediaEmbed,
	Paragraph,
	ParagraphButtonUI,
	PasteFromOffice,
	PreserveStyle,
	RemoveFormat,
	Snippet,
	SourceEditing,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableToolbar,
	TextTransformation,
	Title,
	Underline
];

const colors = [
	'#4D4D4D',
	'#999999',
	'#FFFFFF',
	'#F44E3B',
	'#FE9200',
	'#FCDC00',
	'#DBDF00',
	'#A4DD00',
	'#68CCCA',
	'#73D8FF',
	'#AEA1FF',
	'#FDA1FF',
	'#333333',
	'#808080',
	'#CCCCCC',
	'#D33115',
	'#E27300',
	'#FCC400',
	'#B0BC00',
	'#68BC00',
	'#16A5A5',
	'#009CE0',
	'#7B64FF',
	'#FA28FF',
	'#000000',
	'#666666',
	'#B3B3B3',
	'#9F0500',
	'#C45100',
	'#FB9E00',
	'#808900',
	'#194D33',
	'#0C797D',
	'#0062B1',
	'#653294',
	'#AB149E'
].map( color => ( { color, label: color } ) );

// Editor configuration.
const defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'removeFormat',
			'|',
			'heading',
			'|',
			'alignment',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'|',
			'horizontalLine',
			'blockQuote',
			'|',
			'bulletedList',
			'numberedList',
			'indent',
			'outdent',
			'|',
			'insertTable',
			'uploadImage',
			'mediaEmbed',
			'link',
			'|',
			'snippet',
			'|',
			'sourceEditing'
		],
		shouldNotGroupWhenFull: true
	},
	link: {
		addTargetToExternalLinks: true
	},
	image: {
		toolbar: [
			'imageStyle:block',
			'imageStyle:inline',
			'imageStyle:side',
			'|',
			'imageTextAlternative',
			'|',
			'linkImage',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	snippet: {
		types: [ ]
	},
	pastefromoffice: {
		ensureRemoveStyle: true
	},
	fontSize: {
		options: [ 10, 12, 'default', 18, 24, 32, 48 ]
	},
	fontColor: {
		colors,
		columns: 12,
		disableUpcast: true
	},
	fontBackgroundColor: {
		colors,
		columns: 12,
		disableUpcast: true
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

export default class CKML extends ClassicEditorBase {
	static get builtinPlugins() { return builtinPlugins; }
	static get defaultConfig() { return defaultConfig; }
}
