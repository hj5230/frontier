import {
  h,
  FunctionComponent,
  VNode,
  Fragment,
} from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { useDefinitions } from '@hooks/useDefinitions'

import { DefinitionModule } from '@typings/definition'

const $error: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.APP,
  )
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (!definitions) return

    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(timer)

          window.location.href =
            definitions.app.path[0].path
        }
        return prevCount - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [definitions])

  const layout = (content: VNode) => (
    <div style={{ textAlign: 'center' }}>{content}</div>
  )

  if (loading) {
    return layout(<h1>Loading...</h1>)
  }

  if (error || !definitions) {
    return layout(
      <h1>Error loading error page information</h1>,
    )
  }

  const { app } = definitions

  return layout(
    <Fragment>
      <h1>{app.$error_title}</h1>
      <p>
        <strong>
          {app.$error_redirect.replace(
            '$',
            count.toString(),
          )}
        </strong>
      </p>
      <p>
        <small>{app.$error_description}</small>
      </p>
    </Fragment>,
  )
}

export default $error
