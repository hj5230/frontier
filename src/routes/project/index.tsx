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
import styles from './index.module.css'
const Project: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.PROJECT,
  )

  const layout = (content: VNode) => (
    <Flex direction="column" gap="3">
      {content}
    </Flex>
  )

  const SKELETON_COUNT = 2

  if (loading) {
    return layout(
      <Fragment>
        {/* ai建议我这么写可以随时改数量 */}
        {[...Array(SKELETON_COUNT)].map((_, index) => (
          <Skeleton key={index}>
            <GlowPanel>
              <div className={styles.skeletonPlaceholder} />
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
        /* 左侧媒体区 */
        const mediaContent = p.media_uri ? (
          <div className={styles.mediaBox}>
            <Inset clip="padding-box" side="all">
              {p.media_uri.includes('bilibili.com') ? (
                <AspectRatio ratio={4 / 3}>
                  <iframe
                    src={p.media_uri}
                    className={styles.mediaFrame}
                    allowFullScreen
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={p.media_uri}
                    alt="project media"
                    className={styles.mediaImage}
                  />
                </AspectRatio>
              )}
            </Inset>
          </div>
        ) : null

        const children = (
          <Flex direction="row" gap="3">
            {mediaContent}
            {/* 右侧内容区 */}
            <Flex
              direction="column"
              gap="2"
              className={styles.content}
            >
              <Flex justify="between">
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
