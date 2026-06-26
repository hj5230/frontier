import { z } from 'zod'
import { useEffect, useState } from 'preact/hooks'

import { Appearance } from '@typings/appearance'

/**
 * Shape of the config an embedding (parent) page may push down via
 * `postMessage`. `passthrough` keeps unknown keys for forward-compat while
 * still validating the fields we care about.
 *
 * TODO: access @mf-lib & use the proper shared types from it.
 */
const ExternalConfigSchema = z
  .object({
    appearance: z.nativeEnum(Appearance).optional(),
  })
  .passthrough()

const SyncMessageSchema = z.object({
  type: z.literal('SYNC_GLOBAL_CONFIG'),
  payload: ExternalConfigSchema,
})

export type ExternalConfig = z.infer<
  typeof ExternalConfigSchema
>

/**
 * Origins allowed to push config into this app. Configure via the
 * comma-separated `TRUSTED_PARENT_ORIGINS` env var; when unset we fall back
 * to same-origin only, so an arbitrary embedding page cannot inject config.
 */
function getTrustedOrigins(): string[] {
  const raw = process.env.TRUSTED_PARENT_ORIGINS
  const configured = raw
    ? raw
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean)
    : []
  return configured.length
    ? configured
    : [window.location.origin]
}

/**
 * @returns external config pushed by a trusted parent frame, or `null`.
 */
export function useExternalConfig() {
  const [config, setConfig] =
    useState<ExternalConfig | null>(null)

  useEffect(() => {
    const trustedOrigins = getTrustedOrigins()

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the direct parent frame...
      if (event.source !== window.parent) return
      // ...and only from an explicitly trusted origin.
      if (!trustedOrigins.includes(event.origin)) return

      // Validate the payload shape before trusting it.
      const result = SyncMessageSchema.safeParse(event.data)
      if (!result.success) return

      setConfig(result.data.payload)
    }

    window.addEventListener('message', handleMessage)

    // The readiness ping carries no sensitive data, so a wildcard target
    // is acceptable here; inbound config is what we gate above.
    window.parent.postMessage(
      { type: 'SUB_APP_READY' },
      '*',
    )

    return () =>
      window.removeEventListener('message', handleMessage)
  }, [])

  return config
}
