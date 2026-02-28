import { useEffect, useState } from 'preact/hooks'

/**
 * TODO: access @mf-lib & use proper types from it
 * @returns external config
 */
export function useExternalConfig() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SYNC_GLOBAL_CONFIG') {
        setConfig(event.data.payload)
      }
    }

    window.addEventListener('message', handleMessage)

    window.parent.postMessage(
      { type: 'SUB_APP_READY' },
      '*',
    )

    return () =>
      window.removeEventListener('message', handleMessage)
  }, [])

  return config
}
