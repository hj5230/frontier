import { h, FunctionComponent, VNode } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { Button } from '@themes/button'
import { Text } from '@themes/text'
import { CopyIcon } from '@radix-ui/react-icons'

import { writeToClipboard } from '@/utils/clipboard'

interface CopyButtonProps {
  textToCopy: string
}

export const LegacyCopyButton: FunctionComponent<
  CopyButtonProps
> = ({ textToCopy }): VNode => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    const copied = await writeToClipboard(textToCopy)
    if (copied) setIsCopied(true)
  }

  useEffect(() => {
    let timer: number | undefined
    if (isCopied) {
      timer = window.setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isCopied])

  return (
    <Button size="1" variant="outline" onClick={handleCopy}>
      {isCopied ? <Text>Copied</Text> : <CopyIcon />}
    </Button>
  )
}
