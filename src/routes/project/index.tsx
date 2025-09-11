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

const Project: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.PROJECT,
  )

  const themeColors = [
    '#8888ff',
    '#ff8888',
    '#44cc88',
    '#ffaa44',
    '#cc44cc',
    '#44bbff',
    '#ffbb44',
    '#44ffbb',
    '#bb44ff',
    '#ff44bb',
  ]

  const layout = (content: VNode) => (
    <Flex direction="column" gap="3">
      {content}
    </Flex>
  )

  if (loading) {
    return layout(
      <Fragment>
        {[1, 2].map((_, index) => (
          <Skeleton key={index}>
            <GlowPanel>
              <div style={{ height: '200px' }} />
            </GlowPanel>
          </Skeleton>
        ))}
      </Fragment>,
    )
  }

  if (error || !definitions) {
    return layout(
      <GlowPanel>
        <div>Error loading work experience information</div>
      </GlowPanel>,
    )
  }

  const { project } = definitions

  return layout(
    <Fragment>
      {project.project.map((p, index) => {
        const children = (
          <Flex direction="row" gap="3">
            {/* 左侧媒体区 */}
            <div
              style={{
                flex: '0 0 320px',
                maxWidth: '900px',
                minWidth: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
              }}
            >
              {p.media_uri &&
                (p.media_uri.includes('bilibili.com') ? (
                  <iframe
                    src={p.media_uri}
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '12px',
                      border: 'none',
                      minHeight: '300px',
                    }}
                    allow="fullscreen"
                  />
                ) : (
                  <img
                    src={p.media_uri}
                    alt="project media"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      borderRadius: '12px',
                      border: '1px solid #333',
                      minHeight: '300px',
                    }}
                  />
                ))}
            </div>
            {/* 右侧内容区 */}
            <Flex
              direction="column"
              gap="2"
              style={{ flex: 1 }}
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
              {p.comment && (
                <Blockquote>
                  <Typewriter text={p.comment} />
                </Blockquote>
              )}
            </Flex>
          </Flex>
        )

        return (
          <GlowPanel
            key={index}
            inputStyle={{
              border: `1px solid ${themeColors[index % themeColors.length]}`,
              boxShadow: 'none', // 关闭 glow 效果
              background: 'rgba(20,24,32,0.85)',
              minHeight: '320px',
            }}
          >
            {children}
          </GlowPanel>
        )
      })}
    </Fragment>,
  )
}

export default Project
