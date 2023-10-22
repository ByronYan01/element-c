<template>
  <!-- 测试demo -->
  <div>
    123
    <el-button @click="clickUploadFuc">上传</el-button>
    <el-input v-model="url"></el-input>
    <input @change="inputChange" id="files1" type="file" multiple />
    <input @change="inputChangeList" id="files2" type="file" multiple webkitdirectory />
    <div class="dragDropArea" ref="dragDropArea" @dragover.stop.prevent="dragoverFuc" @dragleave.stop.prevent="dragleaveFuc" @drop.stop.prevent="dropFuc"></div>
    <div v-for="item in blockContentList" :key="item">
      {{ item.name + '  ---  ' + filterSize(item.totolSize || item.size) }}
    </div>
    <!-- <div v-for="item in showUploadList" :key="item">
      {{ item.name + '  ---  ' + filterSize(item.totolSize || item.size) }}
    </div> -->
    <!-- <upload-obj v-if="uploadFlag" :dialogVisible="uploadFlag" @onCancel="onCancel"></upload-obj> -->
  </div>
</template>
<script>
import axios from 'axios'
// import uploadObj from './components/uploadObj.vue'
export default {
  name: 'oss',
  components: {
    // uploadObj,
  },
  data() {
    return {
      uploadFlag: false,
      url: '',
      blockContentList: {},
      lenLimit: 10,
      sizeLimit: 1 * 1024 * 1024,
    }
  },
  computed: {
    showUploadList() {
      console.log('ssss===this.blockContentList==', this.blockContentList)
      return Object.values(this.blockContentList).map((item) => item[0])
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initDragDropArea();
    // });
  },
  methods: {
    clickUploadFuc() {
      this.uploadFlag = true
    },
    onCancel() {
      this.uploadFlag = false
    },
    errHanlder(err) {
      if (err.message === 'size') {
        this.$message.warning(`存在文件超过 1 M`)
      }
    },
    dragoverFuc(e) {
      console.log('dragoverFuc e.type===', e.type)
    },
    dragleaveFuc(e) {
      console.log('dragleaveFuc e.type===', e.type)
    },
    dropFuc(e) {
      // 获取文件列表对象
      const files = e.target.files || e.dataTransfer.files
      console.log('dropFuc e.target.files===', e.target)
      console.log('dropFuc e.dataTransfer.files===', e.dataTransfer)
      console.log('dropFuc e.dataTransfer.items===', e.dataTransfer.items)
      this.addDataTransfer(e.dataTransfer)
    },
    addDataTransfer(dataTransfer) {
      if (dataTransfer?.items?.length) {
        const entrys = []
        for (let i = 0; i < dataTransfer.items.length; i++) {
          const dataTransferTtem = dataTransfer.items[i]
          let entry
          if (dataTransferTtem.getAsEntry) {
            entry = dataTransferTtem.getAsEntry() || dataTransferTtem.getAsFile()
          } else if (dataTransferTtem.webkitGetAsEntry) {
            entry = dataTransferTtem.webkitGetAsEntry() || dataTransferTtem.getAsFile()
          } else {
            entry = dataTransferTtem.getAsFile()
          }
          if (entry) {
            entrys.push(entry)
          }
          this
        }
        return this.getFileSystemEntry(entrys).then(
          (files) => {
            console.log('files===', files)
            if (files.filter((file) => file.type !== 'text/directory').length > this.lenLimit) {
              this.$message.warning(`文件数量超过`)
              return
            }
            // todo：需要追加，相同替换
            this.blockContentList = files
            // return this.add(files);
          },
          (err) => {
            this.errHanlder(err)
            console.log('err===', err)
          },
        )
        // return this.getBlockContent(entrys).then(
        //   (blockContent) => {
        //     console.log('blockContent====', blockContent)
        //     // 先替换再判断总数
        //     const mergeBlockContent = Object.assign({}, this.blockContentList, blockContent)
        //     const files = Object.keys(mergeBlockContent).reduce((acc, cur) => {
        //       acc.push(...mergeBlockContent[cur])
        //       return acc
        //     }, [])
        //     console.log('files====', files)
        //     if (files.filter((file) => file.type !== 'text/directory').length > this.lenLimit) {
        //       this.$message.warning(`文件数量超过`)
        //       return
        //     }

        //     this.blockContentList = mergeBlockContent
        //   },
        //   (err) => {
        //     console.log('blockContent err===', err)
        //   },
        // )
      }
    },
    // getBlockContent(entrys) {
    //   return new Promise((resolve, reject) => {
    //     const blockContent = {};
    //     const forEach = (i) => {
    //       const v = entrys[i];
    //       if (!v) {
    //         return resolve(blockContent);
    //       }
    //       this.getFileSystemEntry(v, "").then(
    //         function (results) {
    //           console.log("getBlockContent results===", results);
    //           blockContent[results[0]?.name] = results;
    //           forEach(i + 1);
    //         },
    //         (err) => {
    //           this.errHanlder(err);
    //         }
    //       );
    //     };
    //     forEach(0);
    //   });
    // },
    getBlockContent(entrys) {
      return new Promise((resolve, reject) => {
        const blockContent = {}
        const forEach = (i) => {
          const v = entrys[i]
          if (!v) {
            return resolve(blockContent)
          }
          this.getFileSystemEntry(v, '').then(
            function (results) {
              console.log('getBlockContent results===', results)
              blockContent[results[0]?.name] = results
              forEach(i + 1)
            },
            (err) => {
              this.errHanlder(err)
            },
          )
        }
        forEach(0)
      })
    },
    // 不记录大小
    // getFileSystemEntry(entry, path = '') {
    //   return new Promise((resolve, reject) => {
    //     if (!entry) {
    //       resolve([])
    //       return
    //     }

    //     if (entry instanceof Array) {
    //       // 多个 entry
    //       const uploadFiles = []
    //       const forEach = (i) => {
    //         const v = entry[i]
    //         if (!v) {
    //           return resolve(uploadFiles)
    //         }
    //         this.getFileSystemEntry(v, path).then(
    //           function (results) {
    //             uploadFiles.push(...results)
    //             forEach(i + 1)
    //           },
    //           (err) => {
    //             this.errHanlder(err)
    //             console.log('err===', err)
    //           },
    //         )
    //       }
    //       forEach(0)
    //       return
    //     }

    //     if (entry.isFile) {
    //       let fileEntry = entry
    //       // 从目录项表示的文件中读取数据 -- FileSystemFileEntry
    //       fileEntry.file((file) => {
    //         if (file.size > this.sizeLimit) {
    //           reject(new Error('size'))
    //         }
    //         resolve([
    //           {
    //             id: '',
    //             size: file.size,
    //             name: path + file.name,
    //             type: file.type,
    //             file,
    //           },
    //         ])
    //       })
    //       return
    //     }

    //     if (entry.isDirectory) {
    //       let directoryEntry = entry
    //       const uploadFiles = []
    //       // 目录也要添加到文件列表(只有第一层的加)
    //       if (!path) {
    //         const curDir = {
    //           id: '',
    //           name: path + directoryEntry.name,
    //           size: 0,
    //           totolSize: 0,
    //           type: 'text/directory',
    //           file: new File([], path + directoryEntry.name, {
    //             type: 'text/directory',
    //           }),
    //         }
    //         uploadFiles.push(curDir)
    //       }
    //       // 读取文件目录内容 -- FileSystemDirectoryEntry: createReader()
    //       const dirReader = directoryEntry.createReader()
    //       let dirFileTotolSize = 0
    //       const readEntries = () => {
    //         dirReader.readEntries((entries) => {
    //           const forEach = (i) => {
    //             if (!entries[i] && i === 0) {
    //               return resolve(uploadFiles)
    //             }
    //             if (!entries[i]) {
    //               // 由于一次 readEntries 数量有上线，若取不到需要再 readEntries，知道返回结果无内容，即第一个为空
    //               return readEntries()
    //             }
    //             // 每个 entry 都会调用获取子 entry（不管文件夹、文件）
    //             /**
    //              * 11/22/33/q.txt   顺序为
    //              * uploadFiles 中有 33，results 为 q.txt
    //              * uploadFiles 中有 22，results 为 33, q.txt
    //              * uploadFiles 中有 11，results 为 22, 33, q.txt
    //              */
    //             this.getFileSystemEntry(entries[i], path + directoryEntry.name + '/').then(
    //               function (results) {
    //                 uploadFiles.push(...results)
    //                 forEach(i + 1)
    //               },
    //               (err) => {
    //                 this.errHanlder(err)
    //                 console.log('err===', err)
    //               },
    //             )
    //           }
    //           forEach(0)
    //         })
    //       }
    //       readEntries()
    //       return
    //     }

    //     resolve([])
    //   })
    // },
    // 获得 entrys 记录大小
    getFileSystemEntry(entry, path = '') {
      return new Promise((resolve, reject) => {
        if (!entry) {
          resolve([])
          return
        }

        if (entry instanceof Array) {
          // 多个 entry
          const uploadFiles = []
          const forEach = (i) => {
            const v = entry[i]
            if (!v) {
              return resolve(uploadFiles)
            }
            this.getFileSystemEntry(v, path).then(
              function (results) {
                uploadFiles.push(...results)
                forEach(i + 1)
              },
              (err) => {
                this.errHanlder(err)
                console.log('err===', err)
              },
            )
          }
          forEach(0)
          return
        }

        if (entry.isFile) {
          let fileEntry = entry
          // 从目录项表示的文件中读取数据 -- FileSystemFileEntry
          fileEntry.file((file) => {
            if (file.size > this.sizeLimit) {
              reject(new Error('size'))
            }
            resolve([
              {
                id: '',
                size: file.size,
                name: path + file.name,
                type: file.type,
                file,
              },
            ])
          })
          return
        }

        if (entry.isDirectory) {
          let directoryEntry = entry
          const uploadFiles = []
          // 目录也要添加到文件列表
          // if (this.createDirectory) {
          const curDir = {
            id: '',
            name: path + directoryEntry.name,
            size: 0,
            totolSize: 0,
            type: 'text/directory',
            file: new File([], path + directoryEntry.name, {
              type: 'text/directory',
            }),
          }
          uploadFiles.push(curDir)
          // }
          // 读取文件目录内容 -- FileSystemDirectoryEntry: createReader()
          const dirReader = directoryEntry.createReader()
          // let dirFileTotolSize = 0
          const readEntries = () => {
            dirReader.readEntries((entries) => {
              const forEach = (i) => {
                if (!entries[i] && i === 0) {
                  // curDir 下文件全部读取完毕的位置
                  // curDir.totolSize = dirFileTotolSize
                  return resolve(uploadFiles)
                }
                if (!entries[i]) {
                  // 由于一次 readEntries 数量有上线，若取不到需要再 readEntries，知道返回结果无内容，即第一个为空
                  return readEntries()
                }
                // 每个 entry 都会调用获取子 entry（不管文件夹、文件）
                /**
                 * 11/22/33/q.txt   顺序为
                 * uploadFiles 中有 33，results 为 q.txt
                 * uploadFiles 中有 22，results 为 33, q.txt
                 * uploadFiles 中有 11，results 为 22, 33, q.txt
                 */
                this.getFileSystemEntry(entries[i], path + directoryEntry.name + '/').then(
                  function (results) {
                    uploadFiles.push(...results)
                    const firstItem = results[0]
                    let size = results[0]?.size ?? 0
                    if (firstItem.type == 'text/directory') {
                      size = results[0]?.totolSize
                    }
                    curDir.totolSize = curDir.totolSize + size
                    forEach(i + 1)
                  },
                  (err) => {
                    this.errHanlder(err)
                    console.log('err===', err)
                  },
                )
              }
              forEach(0)
            })
          }
          readEntries()
          return
        }

        resolve([])
      })
    },
    /**
     * 文件大小 字节转换单位
     * @param size
     * @returns {string|*}
     */
    filterSize(size) {
      if (!size) return ''
      if (size < this.pow1024(1)) return size + ' B'
      if (size < this.pow1024(2)) return (size / this.pow1024(1)).toFixed(2) + ' KB'
      if (size < this.pow1024(3)) return (size / this.pow1024(2)).toFixed(2) + ' MB'
      if (size < this.pow1024(4)) return (size / this.pow1024(3)).toFixed(2) + ' GB'
      return (size / this.pow1024(4)).toFixed(2) + ' TB'
    },

    // 求次幂
    pow1024(num) {
      return Math.pow(1024, num)
    },
    inputChangeList(event) {
      console.log('event===', event)
      console.log('event.target.files===', event.target.files)
      this.uploadFuc(event.target.files)
    },
    inputChange(event) {
      console.log('event===', event)
      console.log('event.target.files===', event.target.files)
      this.uploadFuc(event.target.files)
    },
    uploadFuc(files) {
      const form = new FormData()
      for (let i = 0, len = files.length; i < len; i++) {
        const item = files[i]
        // form.append('key', item.name);
        // form.append('file', item);
        form.append(item.name, item)
      }
      console.log('form===', form)
      axios
        .put(this.url, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log('res===', res)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.dragDropArea {
  width: 300px;
  height: 200px;
  border: 1px solid darkgoldenrod;
}
</style>
