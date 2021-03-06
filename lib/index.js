'use babel';
import { getConfig } from './utils';

let atomHotPackageLoader = null;

export const config = {
  autoWatchTarget: {
    order: 1,
    type: 'boolean',
    default: false,
    description: 'Start watching the targeted package right after it has been selected',
  },
  detectTargetOnStart: {
    order: 2,
    type: 'boolean',
    default: false,
    description: 'Detect target package automatically when activating this package',
  },
  watchedTargetReloadDelay: {
    order: 3,
    type: 'integer',
    default: 100,
    description: 'Delay (ms) before reloading watched target package. Unwatch and watch target package again in order for this setting to take effect.',
  },
  onlyInDevMode: {
    order: 4,
    type: 'boolean',
    default: true,
    description: '',
  },
  outputLog: {
    order: 5,
    type: 'boolean',
    default: false,
    description: 'Output log',
  },
};

function deactivateThisPackage() {
  const disposable = atom.packages.onDidActivatePackage(({name}) => {
    if (name === 'atom-hot-package-loader') {
      disposable.dispose();
      atom.packages.deactivatePackage(name);
    }
  });
}

export function activate(state) {
  if (getConfig('onlyInDevMode') && !atom.inDevMode()) {
    deactivateThisPackage();
  }

  const AtomHotPackageLoader = require('./atom-hot-package-loader');
  atomHotPackageLoader = new AtomHotPackageLoader();
  atomHotPackageLoader.activate(state);
}

export function deactivate() {
  atomHotPackageLoader.deactivate();
}

export function consumeStatusBar(statusBar) {
  atomHotPackageLoader.consumeStatusBar(statusBar);
}
