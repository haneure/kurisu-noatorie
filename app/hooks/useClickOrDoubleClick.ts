import { useRef } from 'react'

export function useClickOrDoubleClick({
  singleClick,
  doubleClick,
  delay = 250,
}: {
  singleClick: () => void
  doubleClick: () => void
  delay?: number
}) {
  const clickTimer = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    console.log(clickTimer.current)
    if (clickTimer.current) {
        console.log('Clearing click timer')
        console.log(clickTimer.current)
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      doubleClick()
    } else {
      clickTimer.current = setTimeout(() => {
        singleClick()
        clickTimer.current = null
      }, delay)
    }
  }

  return handleClick
}
