
export default class Collector {
  /**
   * 收集器：达到一定阈值执行callback
   * @param {Number} max 收集器容量阈值 
   * @param {Promise|Function} callback 回调函数返回 Promise，可以回收执行失败的数据 
   */
  constructor({ max }, callback=()=>{}){
    this.pieces = []
    this.sending = false
    this.max = max || 50
    this.callback = callback
    window.addEventListener('beforeunload', () => this.send())
  }

  add(data){
    this.pieces.push(data)
    if (this.pieces.length >= this.max) {
      this.send()
    }
  }

  async send(){
    if (this.sending || !this.pieces?.length) return
    try{
      this.sending = true
      const copiedPieces = [...this.pieces]
      this.pieces = []
      const res = this.callback(copiedPieces)
      if (res instanceof Promise) {
        await res.catch(() => {
          this.pieces = {
            ...copiedPieces,
            ...this.pieces,
          }
        })
      }
    }finally{
      this.sending = false
    }
  }
}