import { useCallback, useRef, useState } from 'react'

const HISTORY_LIMIT = 50
const HISTORY_GROUP_DELAY_MS = 300

type SetStateAction<T> = T | ((prev: T) => T)

interface HistoryState<T> {
  past: T[]
  future: T[]
}

export function useHistoryState<T>(
  value: T,
  setValue: (value: SetStateAction<T>) => void,
) {
  const historyRef = useRef<HistoryState<T>>({ past: [], future: [] })
  const pendingPastRef = useRef<T | null>(null)
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [, setVersion] = useState(0)

  const syncHistoryState = () => {
    setVersion((version) => version + 1)
  }

  const flushPendingPast = useCallback(() => {
    if (pendingPastRef.current === null) {
      return
    }

    historyRef.current = {
      past: [...historyRef.current.past, pendingPastRef.current].slice(-HISTORY_LIMIT),
      future: historyRef.current.future,
    }
    pendingPastRef.current = null
  }, [])

  const schedulePastCommit = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current)
    }

    commitTimerRef.current = setTimeout(() => {
      flushPendingPast()
      commitTimerRef.current = null
      syncHistoryState()
    }, HISTORY_GROUP_DELAY_MS)
  }, [flushPendingPast])

  const setValueWithHistory = useCallback(
    (nextValue: SetStateAction<T>) => {
      setValue((previousValue) => {
        const resolvedValue =
          typeof nextValue === 'function'
            ? (nextValue as (prev: T) => T)(previousValue)
            : nextValue

        if (Object.is(resolvedValue, previousValue)) {
          return previousValue
        }

        if (pendingPastRef.current === null) {
          pendingPastRef.current = previousValue
        }

        historyRef.current = {
          past: historyRef.current.past,
          future: [],
        }
        schedulePastCommit()
        syncHistoryState()

        return resolvedValue
      })
    },
    [schedulePastCommit, setValue],
  )

  const undo = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current)
      commitTimerRef.current = null
    }
    flushPendingPast()

    const previousValue = historyRef.current.past[historyRef.current.past.length - 1]

    if (previousValue === undefined) {
      return
    }

    const nextPast = historyRef.current.past.slice(0, -1)
    historyRef.current = {
      past: nextPast,
      future: [value, ...historyRef.current.future].slice(0, HISTORY_LIMIT),
    }
    setValue(previousValue)
    syncHistoryState()
  }, [flushPendingPast, setValue, value])

  const redo = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current)
      commitTimerRef.current = null
    }
    flushPendingPast()

    const nextValue = historyRef.current.future[0]

    if (nextValue === undefined) {
      return
    }

    historyRef.current = {
      past: [...historyRef.current.past, value].slice(-HISTORY_LIMIT),
      future: historyRef.current.future.slice(1),
    }
    setValue(nextValue)
    syncHistoryState()
  }, [flushPendingPast, setValue, value])

  const clearHistory = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current)
      commitTimerRef.current = null
    }

    pendingPastRef.current = null
    historyRef.current = { past: [], future: [] }
    syncHistoryState()
  }, [])

  return {
    value,
    setValue: setValueWithHistory,
    undo,
    redo,
    clearHistory,
    canUndo: historyRef.current.past.length > 0 || pendingPastRef.current !== null,
    canRedo: historyRef.current.future.length > 0,
  }
}