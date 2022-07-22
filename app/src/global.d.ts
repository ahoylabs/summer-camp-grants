import type { ENVTypes } from '../envTypes'

type AppTypes = ENVTypes['app']

export declare global {
  interface Window {
    heap: {
      addUserProperties: (p: { [property: string]: string }) => void
      identify: (s: string) => void
    }
  }

  namespace NodeJS {
    interface ProcessEnv extends AppTypes {
      NODE_ENV: string
    }
  }
}
