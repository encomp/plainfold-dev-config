# @plainfold/dev-config

Shared development configuration for the Plainfold ecosystem. This package is the foundation that all other Plainfold packages depend on as a `devDependency`.

## Installation

This package is NOT published to npm. Install it as a git dependency:

```bash
npm install --save-dev encomp/plainfold-dev-config
```

## Exports

### ESLint flat config

```js
// eslint.config.js in consuming package
import { pfEslintConfig } from '@plainfold/dev-config/eslint'

export default [
  pfEslintConfig,
  // add project-specific overrides here
]
```

The shared config includes:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` recommended rules
- `eslint-plugin-react-refresh` Vite config
- Underscore-prefixed variables/args ignored for unused-vars rule
- Browser globals enabled

### TypeScript base config

```jsonc
// tsconfig.json in consuming package
{
  "extends": "@plainfold/dev-config/tsconfig.base.json",
  "compilerOptions": {
    "paths": { "~/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

Key settings: `target: es2023`, `module: esnext`, `moduleResolution: bundler`, `strict: true`, `jsx: react-jsx`, `erasableSyntaxOnly: true`.

### Vite library config factory

```js
// vite.config.ts in consuming package
import { createViteLibConfig } from '@plainfold/dev-config/vite-lib'
import react from '@vitejs/plugin-react'

export default createViteLibConfig({
  entry: 'src/index.ts',       // default
  external: ['dexie'],          // added to react/react-dom defaults
  plugins: [react()],
})
```

Produces dual ES/CJS output (`index.mjs` / `index.cjs`). React, react-dom, and react/jsx-runtime are always externalized.

## Development

```bash
npm install
# Validate all configs load
node -e "import('./eslint.config.js').then(() => console.log('ESLint OK'))"
node -e "require('./tsconfig.base.json'); console.log('tsconfig OK')"
node -e "import('./vite.lib.config.js').then(m => { m.createViteLibConfig(); console.log('Vite OK') })"
```

## Key decisions

- **No npm publish:** Installed via git URL to avoid registry overhead for an internal-only package.
- **Flat ESLint config only:** No legacy `.eslintrc` support. All consumers use ESLint v10+ flat config.
- **Peer dependencies not bundled:** `eslint`, `typescript`, and `vite` are peer deps -- consumers provide their own versions.
- **`erasableSyntaxOnly`:** TypeScript 6+ flag ensuring type annotations are erasable (no enums, no namespaces with runtime code).
