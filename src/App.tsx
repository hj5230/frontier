import { h, FunctionComponent, VNode } from 'preact'

import { Route, Router } from 'preact-router'

import { useEffect, useState } from 'preact/hooks'
import { useDefinitions, useExternalConfig } from '@hooks/.'

import { Appearance } from '@typings/appearance'
import { DefinitionModule } from '@typings/definition'

import { Theme } from '@themes/theme'
import { Separator } from '@themes/separator'
import { Skeleton } from '@themes/skeleton'
import { Flex } from '@themes/flex'
import { Box } from '@themes/box'

import { Draggable } from '@components/Draggable'
import { Navbar } from '@components/Navbar'
import { Panel } from '@components/Panel'
import { OperationIndex } from '@components/Operation'

import Home from '@routes/home'
import Resume from '@routes/resume'
import Project from '@routes/project'
import Contact from '@routes/contact'
import Work from '@routes/work'
import $error from '@routes/error'
import { GlobalContext } from './context'

const App: FunctionComponent = (): VNode => {
  const searchParams = Object.fromEntries(
    new URLSearchParams(window.location.search),
  )
  const isEmbedded = searchParams.embedded === '1'

  const [appearance, setAppearance] = useState(
    isEmbedded ? Appearance.LIGHT : Appearance.DARK,
  )
  // resolve color matching issue in a bit
  // const [themeColor, setThemeColor] = useState('iris')

  const config = useExternalConfig()

  useEffect(() => {
    if (config?.appearance) {
      setAppearance(config.appearance)
    }
  }, [config])

  function changeAppearance() {
    setAppearance(prev =>
      prev === Appearance.DARK
        ? Appearance.LIGHT
        : Appearance.DARK,
    )
  }

  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.APP,
  )

  const layout = (content: VNode) => (
    <GlobalContext.Provider value={{ isEmbedded }}>
      <Theme
        appearance={appearance}
        accentColor="teal"
        grayColor="sage"
        style={{ minHeight: 0 }}
      >
        {!isEmbedded && (
          <Draggable
            items={
              <OperationIndex
                appearance={appearance}
                changeAppearance={changeAppearance}
              />
            }
          />
        )}
        <Navbar />
        <Separator my="3" size="4" color="cyan" />
        <Panel
          inputStyle={{
            height: 'calc(100vh - 100px)',
          }}
        >
          {content}
        </Panel>
      </Theme>
    </GlobalContext.Provider>
  )

  if (loading) {
    return layout(
      <Flex gap="4">
        <Skeleton>
          <Box width="160px" height="160px" />
        </Skeleton>
        <Flex direction="column" gap="2">
          <Skeleton>
            <Box width="120px" height="40px" />
          </Skeleton>
          <Skeleton>
            <Box width="80px" height="30px" />
          </Skeleton>
        </Flex>
      </Flex>,
    )
  }

  if (error) {
    return layout(
      <Router>
        <Route default component={$error} />
      </Router>,
    )
  }

  if (!definitions.app || !definitions.app.path) {
    return layout(
      <div>Error: Invalid app configuration</div>,
    )
  }

  // Map each route definition to its component by name, so registration is
  // independent of the order/length of `app.path` in the remote config.
  const routeComponents: Record<string, FunctionComponent> =
    {
      Home,
      Resume,
      Project,
      Work,
      Contact,
    }

  return layout(
    <Router>
      {definitions.app.path
        .filter(entry => routeComponents[entry.name])
        .map(entry => (
          <Route
            key={entry.path}
            path={entry.path}
            component={routeComponents[entry.name]}
          />
        ))}
      <Route default component={$error} />
    </Router>,
  )
}

export default App
