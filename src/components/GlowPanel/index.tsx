import { h, FunctionComponent, VNode } from 'preact'

import { Card } from '@themes/card'
import { Button } from '@themes/button'

import styles from './glow-panel.module.css'

interface GlowPanelProps {
  children: VNode | React.ReactNode
  glowSpan?: number
  inputStyle?: React.CSSProperties
}

export const GlowPanel: FunctionComponent<
  GlowPanelProps
> = ({ children, glowSpan = 20, inputStyle }): VNode => {
  return (
    <div
      className={styles.container}
      style={{
        ['--glow-span' as string]: `${glowSpan}vh`,
      }}
    >
      <Card className={styles.card} style={inputStyle}>
        {children}
      </Card>
      <Button size="4" className={styles.glow} />
    </div>
  )
}
