<template>
  <span class="dhy-icon-loading"></span>
</template>

<style>
.dhy-icon-loading{
  display: inline-block;
  border: solid 1px transparent;
  width: 1em;
  height: 1em;
  flex: 0 0 1em;
  border-radius: 50%;
  border-left-color: currentColor;
  border-top-color: currentColor;
  animation: spin infinite 1s linear;
}
@keyframes spin {
  0%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}
</style>