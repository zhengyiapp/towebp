<template>
  <div ref="scroller" class="admin-layout">
    <div class="header box display-f flex-ac">
      <div class="max display-f flex-ac flex-jb">
        <RouterLink to="/" class="font-16"><b>TOWEBP</b></RouterLink>
      </div>
    </div>
    <Home />
  </div>
</template>

<script setup>
import Home from '@/pages/index.vue'
</script>

<style lang="scss">
:root{
  --gold: 249, 218, 73;
  --boxPadding: 1.5em;
}
body{
  background: rgba(var(--primary), .075);
  color: rgb(var(--content));
  min-height: 100vh;
}

.max{
  max-width: 100%;
  padding-right: var(--boxPadding);
  padding-left: var(--boxPadding);
  margin-left: auto;
  margin-right: auto;
  width: 1400px;
}
.max-800{
  width: 800px;
}
.box {
  padding-right: var(--boxPadding);
  padding-left: var(--boxPadding);
}
.flex-auto{
  flex: 1 1 auto;
  width: 0;
}
.mr-2{
  margin-right: 0.1428em;
}
.mr-5{
  margin-right: 0.3571em;
}
.mt-5{
  margin-top: 0.3571em;
}

.admin-layout{
  .header{
    height: 60px;
    border-bottom: solid 1px rgba(var(--content), .1);
  }
}
</style>
