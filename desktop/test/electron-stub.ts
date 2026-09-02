// Minimal stand-in for the `electron` module, aliased in by vitest.config.ts.
//
// Main-process modules touch Electron at import time -- storage.ts calls
// app.getPath('appData') at module scope -- so importing anything under
// electron/ outside the Electron runtime throws before a test can run.
// Only the surface reached during module load needs to be real; everything
// else is a no-op so the import chain completes.
import os from 'node:os';
import path from 'node:path';

const testRoot = path.join(os.tmpdir(), 'imsc-desktop-test');

export const app = {
  getPath: (name: string) => path.join(testRoot, name),
  getAppPath: () => testRoot,
  getName: () => 'ImscDesktop',
  getVersion: () => '0.0.0-test',
  on: () => {},
  once: () => {},
  whenReady: async () => {},
  quit: () => {},
};

const noop = () => {};

export const ipcMain = {
  on: noop,
  once: noop,
  handle: noop,
  handleOnce: noop,
  removeHandler: noop,
  removeAllListeners: noop,
};

export class BrowserWindow {
  static getAllWindows(): BrowserWindow[] {
    return [];
  }
  static fromWebContents(): BrowserWindow | null {
    return null;
  }
  webContents = { send: noop, on: noop };
  on = noop;
}

export const shell = { openExternal: async () => {}, openPath: async () => '' };
export const dialog = {
  showOpenDialog: async () => ({ canceled: true, filePaths: [] }),
  showSaveDialog: async () => ({ canceled: true, filePath: undefined }),
};
export const nativeTheme = { shouldUseDarkColors: false, on: noop };

export default { app, ipcMain, BrowserWindow, shell, dialog, nativeTheme };
