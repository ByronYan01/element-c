const createStack = () => {
  let stack = []
  return {
    // 尾入
    push(item) {
      return stack.push(item)
    },
    // 尾出
    pop() {
      return stack.pop()
    },
    // 头删（超过历史栈）
    shift() {
      return stack.shift()
    },
    clear() {
      stack = []
    },
    curItem() {
      return stack[stack.length - 1]
    },
    getStack() {
      return stack
    },
    size() {
      return stack.length
    },
    empty() {
      return stack.length === 0
    },
  }
}
export const createHistory = (MAX_LIMIT = 6) => {
  // 撤销
  const undo = createStack()
  // 后退
  const redo = createStack()
  return {
    getCurItem() {
      return undo.curItem()
    },
    addHistory(data) {
      if (undo.size() > MAX_LIMIT) {
        undo.shift()
      }
      undo.push(data)
    },
    undoHistory() {
      if (undo.empty()) return
      redo.push(undo.pop())
    },
    redoHistory() {
      if (redo.empty()) return
      undo.push(redo.pop())
    },
    getUndo() {
      return undo.getStack()
    },
    getRedo() {
      return redo.getStack()
    },
  }
}
