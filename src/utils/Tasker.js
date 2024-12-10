
export default class Tasker {
  /**
   * 队列执行器
   * @param {Number} options.maxTasks 最大线程 
   * @param {Number} options.delay 执行之前等待时间
   * @param {Number} options.maxRetry 执行失败时，最大尝试次数
   */
  constructor(options={}){
    options = {
      maxTasks: 5,
      maxRetry: 3,
      delay: 0,
      tasks: [],
      runCount: 0,
      ...options,
    }
    for(const k in options) {
      this[k] = options[k]
    }
  }

  sleep(time){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  /**
   * 加入执行队列
   * @param {Function} fn 必须为待执行函数
   */
  add(fn, maxRetry){
    const task = {
      resolve: null,
      reject: null,
      exec: fn,
      retryCount: 0,
      maxRetry: maxRetry ?? this.maxRetry
    }
    const promise = new Promise((resolve, reject) => {
      task.resolve = resolve
      task.reject = reject
    })
    this.tasks.push(task)
    this.run()
    return promise
  }

  async run(){
    if (!this.tasks.length || this.runCount >= this.maxTasks) return
    this.runCount++
    const task = this.tasks.splice(0, 1)[0]

    const errorHandle = e => {
      // 任务执行失败，尝试重新执行
      if (task.retryCount < task.maxRetry) {
        task.retryCount += 1
        this.tasks.unshift(task)
      } else {
        task.reject(e)
      }
    }

    try{
      // 延迟
      if (this.delay) {
        await this.sleep(this.delay)
      }
      // 开始执行
      await task.exec().then(res => {
        task.resolve(res)
      }).catch(errorHandle)
    }catch(e){
      console.error(e)
    }finally{
      this.runCount--
      this.run()
    }
  }

  destroy(){
    this.task = []
  }
}

// let tasker = new Tasker()

// const work1 = function(){
//   return new Promise((resolve, reject)=>{
//     setTimeout(() => {
//       console.log(`work1执行成功`)
//       resolve()
//     }, 2000)
//   })
// }
// const work2 = function(){
//   return new Promise((resolve, reject)=>{
//     setTimeout(() => {
//       console.log(`work2执行失败`)
//       reject()
//     }, 1000)
//   })
// };

// (async ()=>{
//   await Promise.all([
//     tasker.add(work1),
//     tasker.add(work2),
//   ]).catch(e=>console.error(e))
//   console.log('done!')
// })();