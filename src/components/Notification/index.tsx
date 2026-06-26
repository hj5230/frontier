import { h, FunctionComponent, VNode } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import styles from './notification.module.css'

type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

interface NotificationProps {
  title: string
  message: string
  type?: NotificationType
  timeout?: number
}

export const Notification: FunctionComponent<
  NotificationProps
> = ({ title, message, type = 'info', timeout }): VNode => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (timeout !== 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, timeout || 2000)

      return () => clearTimeout(timer)
    }
  }, [timeout])

  if (!isVisible) return null

  return (
    <div
      role="alert"
      className={`${styles.toast} ${styles[type]}`}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
