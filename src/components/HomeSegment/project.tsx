import {
  h,
  FunctionComponent,
  VNode,
  Fragment,
} from 'preact'

import { useDefinitions } from '@hooks/useDefinitions'

import { DefinitionModule } from '@typings/definition'

import { Link } from '@themes/link'
import { Heading } from '@themes/heading'
import { Flex } from '@themes/flex'
import { Text } from '@themes/text'
import { Blockquote } from '@themes/blockquote'
import { Box } from '@themes/box'
import { Skeleton } from '@themes/skeleton'

import { CubeIcon } from '@radix-ui/react-icons'

import { GlowPanel } from '@components/GlowPanel'
import { Typewriter } from '@components/TypeWriter'
import { Media } from '@components/Media'

export const Project: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.APP,
    DefinitionModule.INDEX,
  )

  const layout = (content: VNode) => (
    <GlowPanel>{content}</GlowPanel>
  )

  if (loading) {
    return layout(
      <Flex direction="column" gap="4">
        <Skeleton>
          <Box width="200px" height="40px" />
        </Skeleton>
        {[1, 2].map((_, index) => (
          <Flex key={index} direction="column" gap="2">
            <Skeleton>
              <Box width="100%" height="30px" />
            </Skeleton>
            <Skeleton>
              <Box width="100%" height="200px" />
            </Skeleton>
            <Skeleton>
              <Box width="90%" height="60px" />
            </Skeleton>
          </Flex>
        ))}
      </Flex>,
    )
  }

  if (error) {
    return layout(
      <div>Error loading project information</div>,
    )
  }

  const { app, index } = definitions

  return layout(
    <Fragment>
      <Link href={app.path[2].path}>
        <Heading size="6" mb="4">
          <Flex align="center" gap="2">
            <CubeIcon width="24" height="24" />
            {index._project}
          </Flex>
        </Heading>
      </Link>
      <Flex direction="column" gap="4">
        {index.project.map(p => (
          <Box key={p.title}>
            <Flex direction="column" gap="1">
              <Link href={p.link}>
                <Text as="p" weight="bold">
                  {p.title}
                </Text>
              </Link>
              {p.image_uri && (
                <Media
                  uri={p.image_uri}
                  type="image"
                  alt={p.title}
                />
              )}
              {p.description.map((d, i) => (
                <Blockquote key={i}>
                  <Typewriter text={d} />
                </Blockquote>
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Fragment>,
  )
}
