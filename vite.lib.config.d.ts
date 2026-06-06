import type { UserConfig, Plugin } from 'vite'

export function createViteLibConfig(options?: {
  entry?: string
  external?: string[]
  plugins?: Plugin[]
}): UserConfig
