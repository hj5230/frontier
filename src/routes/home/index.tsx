import { h, FunctionComponent, VNode } from 'preact'

import { Grid } from '@themes/grid'
import { Flex } from '@themes/flex'
import { GlowPanel } from '@components/GlowPanel'
import { Heading } from '@themes/heading'
import { useMobile } from '@hooks/useMobile'

import {
  Header,
  Project,
  Intro,
  Experience,
  Contact,
} from '@components/HomeSegment'

const Home: FunctionComponent = (): VNode => {
  const isMobile = useMobile()
  if (isMobile == null) {
    return (
      <GlowPanel>
        <br />
        <Heading>加载中</Heading>
      </GlowPanel>
    )
  }

  switch (isMobile) {
    case true:
      return (
        <Flex direction="column" gap="4">
          <Header />
          <Project />
          <Intro />
          <Experience />
          <Contact />
        </Flex>
      )
    default:
      return (
        <Grid columns="2" gap="4">
          {/* Left column */}
          <Flex direction="column" gap="4">
            <Header />
            <Project />
          </Flex>
          {/* Right column */}
          <Flex direction="column" gap="4">
            <Intro />
            <Experience />
            <Contact />
          </Flex>
        </Grid>
      )
  }
}

export default Home
