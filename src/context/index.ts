import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

interface GlobalContext {
  isEmbedded: boolean
}

export const GlobalContext = createContext<GlobalContext>({
  isEmbedded: false,
})

export function useGlobalContext() {
  return useContext(GlobalContext)
}
