import UAParser from 'ua-parser-js'

import { useState, useEffect } from 'preact/hooks'

import { VisitorInfo } from '@typings/visitor_info'

/**
 * Collects and returns comprehensive visitor information including user agent, device details, and browser capabilities.
 * @returns {VisitorInfo | undefined} Visitor information object containing userAgent, window, and navigator data, or undefined while loading
 * @example
 * const visitorInfo = useVisitorInfo()
 * if (visitorInfo) {
 *   console.log(visitorInfo.userAgent.device.type) // 'mobile', 'tablet', etc.
 * }
 */
export function useVisitorInfo() {
  const [visitorInfo, setVisitorInfo] = useState<
    VisitorInfo | undefined
  >(undefined)

  useEffect(() => {
    const parser = new UAParser()
    const result = parser.getResult()

    setVisitorInfo({
      userAgent: {
        browser: {
          name: result.browser.name,
          version: result.browser.version,
        },
        cpu_arch: result.cpu.architecture,
        device: {
          type: result.device.type,
          vendor: result.device.vendor,
          model: result.device.model,
        },
        engine: {
          name: result.engine.name,
          version: result.engine.version,
        },
        os: {
          name: result.os.name,
          version: result.os.version,
        },
      },
      window: {
        screenResolution: {
          width: window.screen.width,
          height: window.screen.height,
        },
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        touchSupport: 'ontouchstart' in window,
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      navigator: {
        language: navigator.language,
        cpuCores: navigator.hardwareConcurrency || 0,
      },
    })
  }, [])

  return visitorInfo
}
