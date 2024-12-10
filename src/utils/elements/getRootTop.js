export default function(el) {
  el = el || this;
  var rootTop = el.offsetTop;
  var parent = el.offsetParent;
  while (parent !== null) {
    rootTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return rootTop;
}