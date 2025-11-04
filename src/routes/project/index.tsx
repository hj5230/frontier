import {
  h,
  FunctionComponent,
  VNode,
  Fragment,
} from 'preact'

import { useDefinitions } from '@hooks/useDefinitions'

import { DefinitionModule } from '@typings/definition'

import { Flex } from '@themes/flex'
import { Heading } from '@themes/heading'
import { Text } from '@themes/text'

import { Blockquote } from '@themes/blockquote'

import { Skeleton } from '@themes/skeleton'

import { GlowPanel } from '@components/GlowPanel'
import { Typewriter } from '@components/TypeWriter'
import { Inset, AspectRatio } from '@radix-ui/themes'

const SKELETON_COUNT = 2

enum MEDIA_TYPES {
  VIDEO = 'video',
  IMAGE = 'img',
}

const Project: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.PROJECT,
  )

  const layout = (content: VNode) => (
    <Flex direction="column" gap="3">
      {content}
    </Flex>
  )

  if (loading) {
    return layout(
      <Fragment>
        {[...Array(SKELETON_COUNT)].map((_, index) => (
          <Skeleton key={index}>
            <GlowPanel>
              <div style={{ height: 200 }} />
            </GlowPanel>
          </Skeleton>
        ))}
      </Fragment>,
    )
  }

  if (error || !definitions) {
    return layout(
      <GlowPanel>
        <br />
        <Heading>页面建设中</Heading>
      </GlowPanel>,
    )
  }

  const { project } = definitions

  return layout(
    <Fragment>
      {project.project.map((p, index) => {
        let mediaContent: VNode = null

        switch (p.media_type) {
          case MEDIA_TYPES.VIDEO:
            mediaContent = (
              <iframe src={p.media_uri} allowFullScreen />
            )
            break
          case MEDIA_TYPES.IMAGE:
            mediaContent = <img src={p.media_uri} />
            break
          default:
            break
        }

        const children = (
          <Flex direction="row" gap="3">
            <Flex
              align="center"
              style={{
                width: '20vw',
              }}
            >
              <Inset clip="padding-box" side="all">
                <AspectRatio ratio={4 / 3}>
                  {mediaContent}
                </AspectRatio>
              </Inset>
            </Flex>

            <Flex direction="column" gap="2" width="100%">
              <Flex justify="between" width="100%">
                <Heading size="6">{p.name}</Heading>
                <Text as="p" color="gray" size="2">
                  {p.period}
                </Text>
              </Flex>
              {p.description.map((d, descIndex) => (
                <Blockquote key={descIndex}>
                  <Typewriter text={d} />
                </Blockquote>
              ))}
              {p.comment ? (
                <Blockquote>
                  <Typewriter text={p.comment} />
                </Blockquote>
              ) : null}
            </Flex>
          </Flex>
        )

        return <GlowPanel key={index}>{children}</GlowPanel>
      })}
    </Fragment>,
  )
}

export default Project
