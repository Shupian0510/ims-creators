# IMS Creators Desktop

![GitHub License](https://img.shields.io/github/license/ImStocker/ims-creators)
[![GitHub Release](https://img.shields.io/github/v/release/ImStocker/ims-creators)](https://github.com/ImStocker/ims-creators/releases)

Local application to develop and store your game ideas: **edit documents, add cross-references, create dialogues, prototype levels, easily export data to game engines** to speed up the path from concept to release.

🌍[Web version](https://ims.cr5.space/) | 🎥[Watch video](https://youtu.be/5PG4eOL0Xoc) | Download builds: 🔗[site](https://ims.cr5.space/desktop) 🔗[itch.io](https://nordth.itch.io/imsc-desktop) 🔗[github](https://github.com/ImStocker/ims-creators/releases)

## Main features

### Write wiki docs

<img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/5987e041-f24f-487a-acae-e3142c5c4227" />

Use the block editor to maintain a wiki on the game, use cross-references, Markdown and more.

### Design dialogues and scripts

<img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/92453519-30a7-492d-bb20-6cc79d88d9de" />

Use the built-in dialogue editor to easily create branching dialogues, write storylines, and integrate them into the game's overall structure.

### Create levels and maps

<img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/71049d86-7297-4dc3-b7f6-89921a1178c2" />

Design locations, place objects and plan gameplay using visual diagrams and descriptions.

### Manage game data

<img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/20b06cca-b1e3-4060-ab28-6736eb3ffd80" />

Describe mechanics, characters, items, and other game elements using a user-friendly block editor. Build a database of game objects and integrate it with your engine.

### Synchronize with your game engine

<img width="400" height="auto" alt="image" src="https://github.com/user-attachments/assets/c83cc7da-4266-4b04-ac05-4c7b99c17325" />

The created objects can be uploaded directly to the game engine in custom JSON or CSV formats and their changes can be tracked via Git.

## Run from source

### Prerequisites

**Node 20, 22 or 23 -- not 24.** `.nvmrc` pins 22. `better-sqlite3` is not an
N-API module, so its binary is ABI-specific, and upstream publishes prebuilt
binaries only up to ABI 131 (Node 23). On Node 24 (ABI 137) npm falls back to
building it from source, which needs a full C++ toolchain.

**On Windows, a C++ toolchain is required regardless of the Node version.**
`electron-builder install-app-deps` runs on postinstall and always source-builds
`@parcel/watcher`: that package ships its prebuilt binaries as separate platform
packages (`@parcel/watcher-win32-x64`), a convention `@electron/rebuild` does not
recognise, so it never finds them. The build output is then never loaded --
`@parcel/watcher/index.js` prefers the platform package -- but the install still
fails without a compiler.

Install **Visual Studio 2022** Build Tools with the "Desktop development with
C++" workload, plus Python 3:

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools --override "--quiet --wait --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
```

Use 2022, not 2026: this project pins `@electron/node-gyp@10.2.0-electron.1`,
which cannot parse newer Visual Studio versions and reports
`unknown version "undefined"`.

macOS and Linux need Xcode command line tools / `build-essential` respectively.

### Build

```bash
git clone https://github.com/Shupian0510/ims-creators.git
cd ims-creators
```

Install dependencies in 3 folders:

```
cd ims-app-base
npm i
cd ../creators
npm i
cd ../desktop
npm i
```

Copy default env:

```
cp .env.example .env
```

Run application (from `desktop/` -- the other two are Nuxt layers, not runnable apps):

```
npm run dev
```

## License

[MIT license](./LICENSE)
