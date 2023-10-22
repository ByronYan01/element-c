export const Queue = function Queue({ request, multiNum = 2 }) {
  // 等待存在 items 中
  this.items = []
  this.requestLoading = false
  this.multiNum = multiNum
  this.request = request
}
Queue.prototype = {
  constructor: Queue,
  // 入队
  enqueue: function (elements) {
    if (!Array.isArray(elements)) {
      elements = [elements]
    }
    this.items = [...this.items, ...elements]
    // this.items.push(elements);
    console.log('this.requestLoading====', this.requestLoading)
    if (!this.requestLoading) {
      this.upload()
    }
  },
  // 出队
  dequeue: function () {
    return this.items.shift()
  },
  // 队头元素值（只查看）
  front: function () {
    return this.items[0]
  },
  // 删除指定元素
  delete: function (obj, key, value) {
    if (this.isEmpty()) return null
    if (key) {
      return findReturn(this.items, (item) => item[key] === value)
    }
    return findReturn(this.items, (item) => item === obj)
  },
  upload() {
    this.requestLoading = true
    multiRequest(this).then(() => {
      console.log('multiRequest full=====')
      this.requestLoading = false
    })
  },
  // 是否为空
  isEmpty: function () {
    return this.items.length == 0
  },
  size: function () {
    return this.items.length
  },
  clear: function () {
    this.items = []
  },
  print: function () {
    console.log(this.items.toString())
  },
}
const findReturn = (list, cb) => {
  const index = list.findIndex((item) => cb(item))
  if (index === -1) return null
  return list.splice(index, 1)[0]
}

/**
 * 问题：每波上传支持并发数，每波间不一定能达到并发数上限
 * @param {*} queue
 * @returns
 */
const multiRequest = (queue) => {
  const cb = queue.request,
    maxNum = queue.multiNum
  // 当前正在进行的数量
  let count = 0

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum && queue.size()) {
      next()
      count++
    }
    function next() {
      const data = queue.dequeue()
      console.log(`开始 ${data.name}`, new Date().toLocaleString())
      cb?.request(data)
        .then(() => {
          console.log(`完成 ${data.name}`, new Date().toLocaleString())
          handleRes('success', data)
        })
        .catch(() => {
          console.log(`结束 ${data.name}`, new Date().toLocaleString())
          handleRes('fail', data)
        })
    }
    function handleRes(state, data) {
      count--
      queue.delete(data)
      cb[state](data)
      if (count === 0 && queue.isEmpty()) {
        resolve()
        return
      }
      if (queue.size()) {
        count++
        next()
      }
      while (count < maxNum && queue.size()) {
        next()
        count++
      }
    }
  })
}
