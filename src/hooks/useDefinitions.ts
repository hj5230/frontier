import { z } from 'zod'

import { useState, useEffect } from 'preact/hooks'

import {
  DefinitionModule,
  DefinitionSchema,
  ResumeDefinitionSchema,
  ProjectDefinitionSchema,
  WorkDefinitionSchema,
  ContactDefinitionSchema,
  NavbarDefinitionSchema,
  AppDefinitionSchema,
} from '@typings/definition'
import { definitionsUrl } from '@typings/constant'

type DefinitionSchemas = {
  [DefinitionModule.INDEX]: typeof DefinitionSchema
  [DefinitionModule.RESUME]: typeof ResumeDefinitionSchema
  [DefinitionModule.PROJECT]: typeof ProjectDefinitionSchema
  [DefinitionModule.WORK]: typeof WorkDefinitionSchema
  [DefinitionModule.CONTACT]: typeof ContactDefinitionSchema
  [DefinitionModule.NAVBAR]: typeof NavbarDefinitionSchema
  [DefinitionModule.APP]: typeof AppDefinitionSchema
}

type DefinitionTypes = {
  [K in DefinitionModule]: z.infer<DefinitionSchemas[K]>
}

const definitionCache: Partial<DefinitionTypes> = {}

function getSchemaForModule(
  moduleName: DefinitionModule,
): DefinitionSchemas[DefinitionModule] {
  switch (moduleName) {
    case DefinitionModule.INDEX:
      return DefinitionSchema
    case DefinitionModule.RESUME:
      return ResumeDefinitionSchema
    case DefinitionModule.PROJECT:
      return ProjectDefinitionSchema
    case DefinitionModule.WORK:
      return WorkDefinitionSchema
    case DefinitionModule.CONTACT:
      return ContactDefinitionSchema
    case DefinitionModule.NAVBAR:
      return NavbarDefinitionSchema
    case DefinitionModule.APP:
      return AppDefinitionSchema
    default:
      throw new Error(`Unknown module: ${moduleName}`)
  }
}

async function fetchDefinitionModule<
  T extends DefinitionModule,
>(
  moduleName: T,
  schema: DefinitionSchemas[T],
): Promise<DefinitionTypes[T]> {
  const url = `${definitionsUrl}/${moduleName}.json`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch definition module: ${moduleName}`,
    )
  }
  const data = await response.json()
  return schema.parse(data)
}

/**
 * Fetches and caches definition data for specified modules.
 * @template T - Array of definition module names
 * @param {...T} moduleNames - One or more definition module names to load
 * @returns {[Partial<Definitions>, boolean, Error | null]} Tuple containing definitions object, loading state, and error
 * @example
 * const [definitions, loading, error] = useDefinitions(DefinitionModule.PROJECT, DefinitionModule.NAVBAR)
 */
export function useDefinitions<
  T extends DefinitionModule[],
>(...moduleNames: T) {
  type Definitions = {
    [K in T[number]]: DefinitionTypes[K]
  }

  const [definitions, setDefinitions] = useState<
    Partial<Definitions>
  >({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDefinitions() {
      try {
        const modulePromises = moduleNames.map(
          async moduleName => {
            if (!definitionCache[moduleName]) {
              const schema = getSchemaForModule(moduleName)
              definitionCache[moduleName] =
                await fetchDefinitionModule(
                  moduleName,
                  schema,
                )
            }
            return {
              moduleName,
              data: definitionCache[
                moduleName
              ] as DefinitionTypes[T[number]],
            }
          },
        )

        const results = await Promise.all(modulePromises)
        const newDefinitions: Partial<Definitions> = {}

        for (const { moduleName, data } of results) {
          newDefinitions[moduleName] = data
        }

        if (isMounted) {
          setDefinitions(newDefinitions)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error('An unknown error occurred'),
          )
          setLoading(false)
        }
      }
    }

    loadDefinitions()

    return () => {
      isMounted = false
    }
  }, [moduleNames.join(',')])

  return [definitions, loading, error] as const
}
