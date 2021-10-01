/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module paste-from-office/filters/removestyle
 */

/**
 * Removes styles for the content pasted from Microsoft Word.
 *
 * @param {module:engine/view/documentfragment~DocumentFragment} documentFragment element `data.content` obtained from clipboard
 * @param {module:engine/view/upcastwriter~UpcastWriter} writer
 */
export default function removeStyle(documentFragment, writer) {
  if (documentFragment.getChildren) {
    for (const child of documentFragment.getChildren()) {
      if (child._removeAttribute) {
        writer.removeAttribute('style', child);
      }

      removeStyle(child, writer);
    }
  }
}
