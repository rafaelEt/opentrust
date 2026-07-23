import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'OpenTrust',
      formats: ['es', 'umd'],
      fileName: (format) => `opentrust.${format}.js`,
    },
    outDir: 'dist-browser',
    emptyOutDir: true,
  },
});
