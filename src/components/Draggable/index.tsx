import { h, FunctionComponent, VNode } from 'preact'
import { useRef, useEffect } from 'preact/hooks'

import { Position } from '@typings/position'

import { Box } from '@themes/box'
import { Flex } from '@themes/flex'

import styles from './draggable.module.css'

interface DraggableProps {
  items: VNode
  initialPosition?: Position
}

// Pixels moved per arrow-key press when the handle has keyboard focus.
const KEYBOARD_STEP = 10

export const Draggable: FunctionComponent<
  DraggableProps
> = ({
  items,
  initialPosition = { x: '45%', y: '5px' },
}): VNode => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const offsetXRef = useRef(0)
  const offsetYRef = useRef(0)

  function clamp(
    value: number,
    min: number,
    max: number,
  ): number {
    return Math.max(min, Math.min(value, max))
  }

  function moveTo(left: number, top: number): void {
    const wrapper = wrapperRef.current
    const parent = wrapper?.parentElement
    if (!wrapper || !parent) return

    const parentRect = parent.getBoundingClientRect()
    const wrapperRect = wrapper.getBoundingClientRect()

    wrapper.style.left = `${clamp(
      left,
      0,
      parentRect.width - wrapperRect.width,
    )}px`
    wrapper.style.top = `${clamp(
      top,
      0,
      parentRect.height - wrapperRect.height,
    )}px`
  }

  function onMouseDown(e: MouseEvent): void {
    const wrapper = wrapperRef.current
    if (wrapper) {
      offsetXRef.current =
        e.clientX - wrapper.getBoundingClientRect().left
      offsetYRef.current =
        e.clientY - wrapper.getBoundingClientRect().top
      wrapper.style.transition = 'none'
      wrapper.style.cursor = 'grabbing'
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      e.preventDefault()
    }
  }

  function onMouseMove(e: MouseEvent): void {
    const parent = wrapperRef.current?.parentElement
    if (!parent) return
    const parentRect = parent.getBoundingClientRect()
    moveTo(
      e.clientX - offsetXRef.current - parentRect.left,
      e.clientY - offsetYRef.current - parentRect.top,
    )
  }

  function onMouseUp(): void {
    const wrapper = wrapperRef.current
    if (wrapper) {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      wrapper.style.cursor = 'grab'
      wrapper.style.transition = 'all 0.2s ease-out'
    }
  }

  function onHandleKeyDown(e: KeyboardEvent): void {
    const wrapper = wrapperRef.current
    const parent = wrapper?.parentElement
    if (!wrapper || !parent) return

    const parentRect = parent.getBoundingClientRect()
    const rect = wrapper.getBoundingClientRect()
    const left = rect.left - parentRect.left
    const top = rect.top - parentRect.top

    switch (e.key) {
      case 'ArrowUp':
        moveTo(left, top - KEYBOARD_STEP)
        break
      case 'ArrowDown':
        moveTo(left, top + KEYBOARD_STEP)
        break
      case 'ArrowLeft':
        moveTo(left - KEYBOARD_STEP, top)
        break
      case 'ArrowRight':
        moveTo(left + KEYBOARD_STEP, top)
        break
      default:
        return
    }
    e.preventDefault()
  }

  useEffect(() => {
    const dragHandle = dragHandleRef.current
    if (dragHandle) {
      dragHandle.addEventListener('mousedown', onMouseDown)
    }

    return () => {
      if (dragHandle) {
        dragHandle.removeEventListener(
          'mousedown',
          onMouseDown,
        )
      }
    }
  }, [initialPosition])

  return (
    <Box
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
      }}
    >
      <Flex align="center" gap="2">
        <div
          ref={dragHandleRef}
          className={styles.handle}
          role="button"
          tabIndex={0}
          aria-label="Drag handle — use arrow keys to move"
          onKeyDown={onHandleKeyDown}
        >
          ⋮⋮
        </div>
        {items}
      </Flex>
    </Box>
  )
}
