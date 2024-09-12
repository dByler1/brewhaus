type Timer = ReturnType<typeof setTimeout>

export const debounce = (callback: () => void, delay: number) => {
  let timerId: Timer
  return () => {
    window.clearTimeout(timerId)
    timerId = window.setTimeout(callback, delay)
  }
}
