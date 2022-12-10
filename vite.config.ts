import { mergeConfig, defineConfig as viteDefineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

export default mergeConfig(
 viteDefineConfig({
  plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }), tsconfigPaths(), svgr()],
 }),
 defineConfig({
  test: {
   globals: true,
   environment: 'jsdom',
   setupFiles: './tests/setup.ts',
  },
 }),
)
