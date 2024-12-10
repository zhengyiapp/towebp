<template>
  <div class="dhy-box">
    <div class="module-title f jb ac">
      <b>{{ title }}</b>
      <slot name="extra"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title:String
})
</script>

<style lang="scss">
.dhy-box{
  .module-title{
    font-size: 20px;
    margin: 1.5em 0 1em;
    position: relative;
    b{
      position: relative;
      z-index: 2;
    }
    &::before{
      z-index: 1;
      display: block;
      content: '';
      background: rgb(var(--second));
      height: 10px;
      width: 2em;
      left: 0;
      bottom: -3px;
      position: absolute;
    }
  }
  .module-nav, .module-post, .module-app{
    margin: -.3em;
    position: relative;
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--white), .6);
      z-index: 101;
    }
    .item{
      display: block;
      padding: .3em;
      &>div{
        transition: all .2s;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 10%;
        text-align: center;
        height: 36px;
        position: relative;
        font-size: .9em;
        background: rgb(var(--primary), .1);
        border-radius: .8em;
        transition: all .2s;
        &:hover{
          background: rgb(var(--primary), .18);
        }
        &>span{
          position: relative;
          label{
            display: inline-block;
            position: absolute;
            font-size: .7em;
            background-color: rgb(var(--error));
            left: 100%;
            margin-left: -.3em;
            top: -.8em;
            color: #fff;
            padding: .1em .3em;
            border-radius: .4em;
          }
        }
      }
    }
  }
  .module-post{
    .item{
      flex: 0 0 33.3333%;
      &>div{
        text-align: left;
        justify-content: flex-start;
        padding: 0 1.5em;
      }
    }
  }
  .module-app{
    .item{
      flex: 0 0 10%;
      &>div{
        height: auto;
        padding: .5em;
        justify-content: flex-start;
        &>.img-box{
          margin-right: .5em;
          img{
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>