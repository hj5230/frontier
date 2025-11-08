import { useVisitorInfo } from '@hooks/useVisitorInfo'

export function useMobile() {
  const visitorInfo = useVisitorInfo()

  if (!visitorInfo) {
    return null
  }

  const deviceType = visitorInfo.userAgent.device.type || ''

  switch (deviceType) {
    case 'mobile':
      return true

    case 'tablet':
      return true

    default:
      return false
  }
}
