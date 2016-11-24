'use babel';

import SmlHighlighterView from './sml-highlighter-view';
import { CompositeDisposable } from 'atom';

export default {

  smlHighlighterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.smlHighlighterView = new SmlHighlighterView(state.smlHighlighterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.smlHighlighterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sml-highlighter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.smlHighlighterView.destroy();
  },

  serialize() {
    return {
      smlHighlighterViewState: this.smlHighlighterView.serialize()
    };
  },

  toggle() {
    console.log('SmlHighlighter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
