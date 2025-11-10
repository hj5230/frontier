import {
  h,
  FunctionComponent,
  VNode,
  Fragment,
} from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'

import { useLocation } from '@hooks/index'
import { useDefinitions } from '@hooks/useDefinitions'

import { DefinitionModule } from '@typings/definition'

import { Avatar } from '@themes/avatar'
import { Box } from '@themes/box'
import { Flex } from '@themes/flex'
import { Link } from '@themes/link'
import { Separator } from '@themes/separator'
import { Root, Slot } from '@themes/text-field'
import { Skeleton } from '@themes/skeleton'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

/**
 * TODO: explicit `event` type instead of `any`
 * @returns {VNode} Navbar component
 */
export const Navbar: FunctionComponent = (): VNode => {
  const [definitions, loading, error] = useDefinitions(
    DefinitionModule.APP,
    DefinitionModule.NAVBAR,
  )
  const [searchValue, setSearchValue] = useState('')
  const currentPath = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)

  function handleSearchValueChange(event) {
    setSearchValue(event.currentTarget.value)
  }

  function handleSearchFocus() {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // @ts-expect-error - most browsers do have method find()
      window.find(searchValue)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'f'
      ) {
        event.preventDefault()
        handleSearchFocus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const layout = (content: VNode) => (
    <Box py="1" px="1">
      <Flex justify="between" align="center">
        {content}
      </Flex>
    </Box>
  )

  if (loading) {
    return layout(
      <Fragment>
        <Flex align="center" gap="4">
          <Skeleton>
            <Box width="32px" height="32px" />
          </Skeleton>
          <Separator orientation="vertical" size="2" />
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index}>
              <Box width="60px" height="24px" />
            </Skeleton>
          ))}
        </Flex>
        <Skeleton>
          <Box width="200px" height="40px" />
        </Skeleton>
      </Fragment>,
    )
  }

  if (error) {
    return layout(
      <div>Error loading navbar information</div>,
    )
  }

  const { app, navbar } = definitions

  return layout(
    <Fragment>
      <Flex
        align="center"
        gap="4"
        style={{ flex: 1, minWidth: 0 }}
      >
        <Link href="/" style={{ flexShrink: 0 }}>
          <Avatar
            src={navbar.site_icon_uri}
            fallback="Frontier"
            size="4"
          />
        </Link>
        <Separator
          orientation="vertical"
          size="2"
          style={{ flexShrink: 0 }}
        />
        <Flex
          align="center"
          gap="4"
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
            whiteSpace: 'nowrap',
            flex: 1,
            minWidth: 0,
          }}
        >
          {app.path.map(n => (
            <Link
              key={n.path}
              href={n.path}
              weight="bold"
              size="4"
              style={{ margin: '10px', flexShrink: 0 }}
              underline={
                currentPath === n.path ? 'always' : 'hover'
              }
              highContrast={currentPath !== n.path}
            >
              {n.name}
            </Link>
          ))}
        </Flex>
      </Flex>
      <Flex align="center" gap="4">
        <Root
          ref={searchInputRef}
          placeholder="⌘ + F"
          radius="full"
          size="3"
          value={searchValue}
          onChange={handleSearchValueChange}
          onKeyPress={handleKeyPress}
          onFocus={handleSearchFocus}
        >
          <Slot>
            <MagnifyingGlassIcon height="24" width="24" />
          </Slot>
        </Root>
        {/* <DropdownMenu.Root
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <DropdownMenu.Trigger>
              <Button variant="soft" size="3">
                <GlobeIcon height="24" width="24" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red">
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root> */}
      </Flex>
    </Fragment>,
  )
}
