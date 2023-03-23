import { fork } from 'child_process'
import os from 'os'
let index = parseInt(os.cpus().length / 2)

const childList = []
for (let i = index; i--; ) {
  const child = fork('./utils/PRGAExcute.js')
  childList[i] = child
}

const PRGAExcuteThread = function (workerData) {
  return new Promise((resolve, reject) => {
    const child = childList[index++ % 4]
    // 只监听一次，这样就可以重复监听
    child.once('message', (res) => {
      resolve(res)
    })
    child.send(workerData)
  })
}

export default PRGAExcuteThread
