import { resolve } from 'path'

/**
 * @param {{ entry?: string, external?: string[], plugins?: import('vite').Plugin[] }} options
 * @returns {import('vite').UserConfig}
 */
export function createViteLibConfig({
  entry = 'src/index.ts',
  external = [],
  plugins = [],
} = {}) {
  return {
    plugins,
    build: {
      lib: {
        entry: resolve(process.cwd(), entry),
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          ...external,
        ],
      },
    },
  }
}
