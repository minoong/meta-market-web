import { mergeConfig, defineConfig as viteDefineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react-swc'

export default mergeConfig(
 viteDefineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
 }),
 defineConfig({
  test: {
   globals: true,
   environment: 'jsdom',
   setupFiles: './tests/setup.ts',
  },
 }),
)
