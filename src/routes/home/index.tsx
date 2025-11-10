import { h, FunctionComponent, VNode } from 'preact'

import { Grid } from '@themes/grid'
import { Flex } from '@themes/flex'
import { GlowPanel } from '@components/GlowPanel'
import { Heading } from '@themes/heading'
import { useDeviceType } from '@hooks/useDeviceType'

import {
  Header,
  Project,
  Intro,
  Experience,
  Contact,
} from '@components/HomeSegment'

const Home: FunctionComponent = (): VNode => {
  const deviceType = useDeviceType()
  if (deviceType == null) {
    return (
      <GlowPanel>
        <br />
        <Heading>加载中</Heading>
      </GlowPanel>
    )
  }

  switch (deviceType) {
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
