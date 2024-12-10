const queryFn = function(selector) {
  if (this instanceof Element) {
    return this.querySelector(selector);
  } else {
    return document.querySelector(selector);
  }
}
Element.prototype.$fq = queryFn;

export default queryFn;
