import { h, FunctionComponent, VNode } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import styles from './typewriter.module.css'

interface TypeWriterProps {
  text: string
  speed?: number
  inputStyle?: preact.JSX.CSSProperties
  soft?: boolean
}

export const Typewriter: FunctionComponent<
  TypeWriterProps
> = ({
  text,
  speed = 20,
  inputStyle,
  soft = false,
}): VNode => {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [index, text, speed])

  return (
    <div
      className={soft ? styles.soft : undefined}
      style={inputStyle}
    >
      {displayedText}
    </div>
  )
}
