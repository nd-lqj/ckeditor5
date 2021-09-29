import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import StylePreserve from './preserve';

export default class Style extends Plugin {
  static get requires() {
    return [StylePreserve];
  }

  static get pluginName() {
    return 'Style';
  }
}
