/* 防抖函数 */
export function debounce(func, delay = 50) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    /* 异步函数 */
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
