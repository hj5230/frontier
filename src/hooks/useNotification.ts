import { useState, useCallback } from 'preact/hooks'

type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

interface NotificationState {
  show: boolean
  title: string
  message: string
  type: NotificationType
}

/**
 * Manages notification state with show/hide functionality.
 * @returns {Object} Notification state and control functions
 * @returns {NotificationState} notification - Current notification state
 * @returns {Function} showNotification - Function to display a notification (title, message, type)
 * @returns {Function} hideNotification - Function to hide the current notification
 * @example
 * const { showNotification, hideNotification } = useNotification()
 * showNotification('Success', 'Data saved!', 'success')
 */
export const useNotification = () => {
  const [notification, setNotification] =
    useState<NotificationState>({
      show: false,
      title: '',
      message: '',
      type: 'info',
    })

  const showNotification = useCallback(
    (
      title: string,
      message: string,
      type: NotificationType,
    ) => {
      setNotification({ show: true, title, message, type })
    },
    [],
  )

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }))
  }, [])

  return {
    notification,
    showNotification,
    hideNotification,
  }
}
