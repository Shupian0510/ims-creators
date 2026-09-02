import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Mirrors viteElectronBuildConfig.resolve.alias in nuxt.config.ts so tests
// resolve main-process imports exactly the way the packaged build does.
//
// HEADS UP -- these specs do not run under `npm test` as installed.
// better-sqlite3 here is built for the Electron ABI (postinstall runs
// electron-builder install-app-deps); plain node needs the node ABI, and
// upstream publishes node prebuilds only up to ABI 131 (Node 22) -- Node 24
// needs ABI 137, which would have to be compiled from source. To run them:
//
//   cd node_modules/better-sqlite3
//   ../.bin/prebuild-install --runtime=node --target=<a node 22 version>
//   cd ../.. && npx vitest run
//   # restore, or the desktop app will not start:
//   cd node_modules/better-sqlite3
//   ../.bin/prebuild-install --runtime=electron --target=36.2.1
//
// Do NOT use `npm rebuild better-sqlite3` for this: it deletes the existing
// .node before building and leaves nothing behind if no toolchain is present.
// This is why CI runs the ims-app-base suite only.
// Note: the bare '~' alias is deliberately omitted -- as a prefix it would
// also swallow '~ims-app-base/...' and friends. No electron code uses it.
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      electron: fileURLToPath(new URL('./test/electron-stub.ts', import.meta.url)),
      '#components': fileURLToPath(new URL('./app/components', import.meta.url)),
      '#logic': fileURLToPath(new URL('./app/logic', import.meta.url)),
      '#bridge': fileURLToPath(new URL('./bridge', import.meta.url)),
      '~ims-app-base': fileURLToPath(
        new URL('../ims-app-base/app', import.meta.url),
      ),
      '~ims-creators': fileURLToPath(new URL('../creators/app', import.meta.url)),
      '~ims-plugin-base': fileURLToPath(
        new URL('../ims-app-base/ims-plugins/base', import.meta.url),
      ),
      '~ims-plugin-creators': fileURLToPath(
        new URL('../creators/ims-plugins/creators', import.meta.url),
      ),
    },
  },
  test: {
    include: ['**/*.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist-electron/**',
      '**/dist-client/**',
      '**/.nuxt/**',
    ],
    globals: true,
  },
});
