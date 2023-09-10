import Vue from 'vue'
import Watcher from './watcher'

Watcher.prototype.mutations = {
  setData(states, data) {
    states._data = data
    states.data = data

    // 数据变化，更新部分数据。
    // 没有使用 computed，而是手动更新部分数据 https://github.com/vuejs/vue/issues/6660#issuecomment-331417140

    this.updateTableScrollY()
  },

  insertColumn(states, column, index, parent) {
    let array = states._columns
    if (parent) {
      array = parent.children
      if (!array) array = parent.children = []
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column)
    } else {
      array.push(column)
    }

    if (this.table.$ready) {
      this.updateColumns() // hack for dynamics insert column
      this.scheduleLayout()
    }
  },

  removeColumn(states, column, parent) {
    let array = states._columns
    if (parent) {
      array = parent.children
      if (!array) array = parent.children = []
    }
    if (array) {
      array.splice(array.indexOf(column), 1)
    }

    if (this.table.$ready) {
      this.updateColumns() // hack for dynamics remove column
      this.scheduleLayout()
    }
  },
}

Watcher.prototype.commit = function (name, ...args) {
  const mutations = this.mutations
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

Watcher.prototype.updateTableScrollY = function () {
  Vue.nextTick(this.table.updateScrollY)
}

export default Watcher
