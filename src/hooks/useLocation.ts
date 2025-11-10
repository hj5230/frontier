import { useState, useEffect } from 'preact/hooks'

/**
 * Tracks and returns the current browser location pathname.
 * @returns {string} The current pathname (e.g., '/project', '/resume')
 * @example
 * const currentPath = useLocation() // Returns '/home'
 */
export function useLocation() {
  if (typeof window === 'undefined') return '/'
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener(
      'popstate',
      handleLocationChange,
    )
    window.addEventListener(
      'pushstate',
      handleLocationChange,
    )
    window.addEventListener(
      'replacestate',
      handleLocationChange,
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handleLocationChange,
      )
      window.removeEventListener(
        'pushstate',
        handleLocationChange,
      )
      window.removeEventListener(
        'replacestate',
        handleLocationChange,
      )
    }
  }, [])

  return path
}

if (typeof window !== 'undefined' && window.history) {
  const originalPushState = window.history.pushState
  const originalReplaceState = window.history.replaceState

  window.history.pushState = function (...args) {
    originalPushState.apply(this, args)
    window.dispatchEvent(new Event('pushstate'))
  }

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args)
    window.dispatchEvent(new Event('replacestate'))
  }
}
