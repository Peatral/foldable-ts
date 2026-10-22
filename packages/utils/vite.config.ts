import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        types: 'src/types.ts'
      },
      name: 'FoldableTsUtils',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['@foldable-ts/types']
    }
  },
  plugins: [
    dts({ rollupTypes: true })
  ]
});
