export default function(el) {
  el = el || this;
  var rootLeft = el.offsetLeft;
  var parent = el.offsetParent;
  while (parent !== null) {
    rootLeft += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return rootLeft;
}