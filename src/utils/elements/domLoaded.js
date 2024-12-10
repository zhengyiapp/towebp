const ready = (callback) => {
  document.addEventListener('DOMContentLoaded', callback);
};
window.$fi = ready;

export default ready;