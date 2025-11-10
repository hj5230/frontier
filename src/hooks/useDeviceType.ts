import { useVisitorInfo } from '@hooks/useVisitorInfo'

/**
 * Detects if the current device is mobile.
 * @returns {boolean | null} true for mobile devices, false for desktop/tablet, null while visitor info is loading
 */
export function useDeviceType() {
  const visitorInfo = useVisitorInfo()

  if (!visitorInfo) {
    return null
  }

  const deviceType = visitorInfo.userAgent.device.type || ''

  switch (deviceType) {
    case 'mobile':
      return true

    default:
      return false
  }
}
