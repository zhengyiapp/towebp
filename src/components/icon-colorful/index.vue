<template>
  <i class="mao-icon-colorful">
    <slot></slot>
  </i>
</template>

<style lang="scss">
.mao-icon-colorful{
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg{
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
}
</style>