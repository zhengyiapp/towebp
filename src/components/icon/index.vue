<template>
  <i class="mao-icon">
    <slot></slot>
  </i>
</template>

<style lang="scss">
.mao-icon{
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg{
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: inherit;
  }
  path{
    fill: inherit;
  }
}
</style>