import { mergeConfig, defineConfig as viteDefineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default mergeConfig(
 viteDefineConfig({
  plugins: [react(), tsconfigPaths()],
 }),
 defineConfig({
  test: {
   globals: true,
   environment: 'jsdom',
   setupFiles: './tests/setup.ts',
  },
 }),
)
