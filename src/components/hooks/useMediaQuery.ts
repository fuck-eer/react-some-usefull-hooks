import { useCallback, useEffect, useState } from 'react'

//!HOOK TO CHECK IF WE ARE GREATER THAN THE BREAKPOINTS
export const useMediaQuery = (breakpoint: number) => {
  const [matchesBreakpoint, setMatchesBreakpoint] = useState<boolean>(true)

  const breakPoint = `${breakpoint}px`

  useEffect(() => {
    setMatchesBreakpoint(window.matchMedia(`(min-width: ${breakPoint})`).matches)
  }, [breakPoint])

  const onResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setMatchesBreakpoint(window.matchMedia(`(min-width: ${breakPoint})`).matches)
    } else {
      setMatchesBreakpoint(true)
    }
  }, [setMatchesBreakpoint, breakPoint])

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  return matchesBreakpoint
}
