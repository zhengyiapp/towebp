const queryFn = function(selector) {
  if (this instanceof Element) {
    return this.querySelectorAll(selector);
  } else {
    return document.querySelectorAll(selector);
  }
}
Element.prototype.$fqs = queryFn;

export default queryFn;
