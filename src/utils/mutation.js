/**
 * 元素监听
 * @param {Element} el 监听的元素
 * @param {Object} config 需要监听的属性 可选值请参考：https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe
 * @param {Function} callback 回调函数
 */
export default (el, config, callback) => {
  // 创建一个 MutationObserver 对象
  const observer = new MutationObserver((mutationsList) => {
    const types = Object.keys(config)
    for (const mutation of mutationsList) {
      const idx = types.findIndex( v => mutation.type === v)
      const type = types[idx]
      callback(mutation)
    }
  });
  
  // 开始监听属性变化
  observer.observe(el, config);
}