import {
  createContext,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import styles from './Tabs.module.css'

// What every part of one set of tabs shares
interface TabsValue {
  selected: string
  select: (tab: string) => void
  /** From useId: makes the tab and panel ids unique, even with two sets of tabs on a page */
  baseId: string
}

// Not exported: only the parts below can read it
const TabsContext = createContext<TabsValue | undefined>(undefined)

function useTabs(part: string): TabsValue {
  const value = useContext(TabsContext)
  if (value === undefined) {
    throw new Error(`<${part}> must be used inside <Tabs>`)
  }
  return value
}

interface TabsProps {
  /** The id of the tab that is selected at first */
  defaultTab: string
  children: ReactNode
}

// The parent: owns which tab is selected and shares it with the parts inside
export function Tabs({ defaultTab, children }: TabsProps) {
  const [selected, setSelected] = useState(defaultTab)
  const baseId = useId()

  return <TabsContext value={{ selected, select: setSelected, baseId }}>{children}</TabsContext>
}

interface TabListProps {
  /** What the tabs are about, for screen readers: "About this cleanup" */
  label: string
  children: ReactNode
}

export function TabList({ label, children }: TabListProps) {
  return (
    <div role="tablist" aria-label={label} className={styles.list}>
      {children}
    </div>
  )
}

// Arrow keys move to the next or previous tab (and wrap around); Home and End jump to the ends
function moveBetweenTabs(event: KeyboardEvent<HTMLButtonElement>) {
  const list = event.currentTarget.closest('[role="tablist"]')
  if (list === null) return
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  const current = tabs.indexOf(event.currentTarget)
  const moves: Record<string, number> = {
    ArrowRight: current + 1,
    ArrowLeft: current - 1 + tabs.length,
    Home: 0,
    End: tabs.length - 1,
  }
  const move = moves[event.key]
  if (move === undefined) return // any other key: not ours
  const next = tabs[move % tabs.length]
  if (next === undefined) return
  event.preventDefault() // Home and End would scroll the page
  next.focus()
  next.click() // select it, as a click would
}

interface TabProps {
  /** Matches the id of the TabPanel this tab shows */
  id: string
  children: ReactNode
}

export function Tab({ id, children }: TabProps) {
  const { selected, select, baseId } = useTabs('Tab')
  const isSelected = id === selected

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${id}`}
      tabIndex={isSelected ? 0 : -1}
      className={styles.tab}
      onClick={() => select(id)}
      onKeyDown={moveBetweenTabs}
    >
      {children}
    </button>
  )
}

interface TabPanelProps {
  /** Matches the id of the Tab that shows this panel */
  id: string
  children: ReactNode
}

export function TabPanel({ id, children }: TabPanelProps) {
  const { selected, baseId } = useTabs('TabPanel')

  // Hidden, not removed: what is inside keeps its state (check-in marks) while another tab shows
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      tabIndex={0}
      hidden={id !== selected}
      className={styles.panel}
    >
      {children}
    </div>
  )
}
