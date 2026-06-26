import { h, VNode, FunctionComponent } from 'preact'

import { Heading } from '@themes/heading'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import styles from './exception.module.css'

export const Exception: FunctionComponent = (): VNode => {
  return (
    <div className={styles.exception}>
      <div className={styles.icon}>
        <ExclamationTriangleIcon width="48" height="48" />
      </div>
      <Heading>出现错误</Heading>
    </div>
  )
}
