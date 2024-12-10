<template>
  <div class="mao-menu scroll" :class="{ 'menu-collapsed': collapsed }">
    <div class="logo f ac">
      <img v-if="logo" :src="logo" />
      <b class="txt-ellipsis-1">{{ title }}</b>
    </div>
    <ul>
      <template v-for="v in menu" :key="v.key">
        <li class="item" :class="{active:value[0]===v.key}">
          <div class="a f ac jb" @click="onMenuClick(v)" :title="v.name">
            <div class="f ac name">
              <i v-if="v.icon" class="micon" :class="[v.icon]"></i><span>{{ v.name }}</span>
            </div>
            <i v-if="v.children?.length" class="micon" :class="[v.children.length && v.active ? 'micon-down' : 'micon-right']"></i>
          </div>
          <ul v-if="(v.children?.length && v.active) || collapsed" class="father">
            <li v-for="child in v.children" :class="{active:value[1]===child.key && value[0]===v.key}">
              <div @click="onSubMenuClick(child)">
                {{ child.name }}
              </div>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  value:{
    type:Array,
    default:()=>[]
  },
  collapsed:Boolean,
  title:String,
  logo:String,
  menu:{
    type:Array,
    default:()=>[]
  }
})
const emits = defineEmits(['update:value', 'change'])

const onMenuClick = record => {
  record.active = !record.active
  if (record.key !== props.value[0]) {
    emits('update:value', [record.key])
    emits('change', [record.key])
  }
}

const onSubMenuClick = record => {
  const value = props.value
  if (record.key !== value[1]) {
    value[1] = record.key
    emits('update:value', value)
    emits('change', value)
  }
}
</script>

<style lang="scss">
.mao-menu{
  flex: 0 0 190px;
  background-color: #2e4051;
  color: #fff;
  z-index: 901;
  word-break: keep-all;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    background: rgba(255, 255, 255, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.6)
  }
  &.menu-collapsed{
    flex: 0 0 50px;
    overflow: visible;
    .logo{
      padding: 0 10px;
      img{
        max-width: 30px;
      }
      .txt-ellipsis-1{
        display: none;
      }
    }
    &>ul{
      &>li{
        position: relative;
        &>div{
          position: relative;
          text-align: center;
          .micon{
            margin-right: 0;
            &+span{
              display: none;
            }
          }
          &>.micon-right, &>.micon-down{
            display: none;
          }
        }
        &>ul.father{
          position: absolute;
          left: 100%;
          top: 0;
          background-color: rgb(var(--white));
          box-shadow: var(--boxShadow);
          border-radius: 0 4px 4px 0;
          color: rgb(var(--content));
          display: none;
          li>div{
            color: rgb(var(--content));
            font-size: 1em;
            padding: 0 1.5em;
            min-width: 140px;
            &:hover{
              background: none!important;
              color: rgb(var(--primary));
            }
          }
          li{
            &.active{
              &>div{
                color: rgb(var(--primary))!important;
                background-color: rgba(var(--primary), .1);
              }
            }
          }
        }
        &:hover{
          &>ul.father{
            display: block;
          }
        }
      }
    }
  }
  .logo{
    height: 48px;
    padding: 0 .5em 0 1em;
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: inherit;
    border-bottom: solid 1px rgba(255,255,255,0.1);
    img{
      max-height: 30px;
      border-radius: 4px;
    }
    b{
      margin-left: 6px;
      flex: 1 1 auto;
    }
  }
  &>ul{
    &>li{
      margin-bottom: 2px;
      &>div{
        .name{
          .micon{
            display: inline-block;
            width: 1.5em;
          }
        }
      }
    }
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      &.active{
        &>div{
          background: rgba(0,0,0,0.2);
          color: rgb(var(--primary));
          position: relative;
          &::before{
            content: '';
            display: block;
            width: 3px;
            height: 100%;
            background-color: rgb(var(--primary));
            position: absolute;
            left: 0;
            top: 0;
          }
          span{
            font-weight: bold;
          }
        }
        .fa{
          display: block;
        }
      }
    }
    li>div{
      display: flex;
      align-items: center;
      height: 2.8em;
      color: #fff;
      padding: 1em;
      cursor: pointer;
      &:hover{
        background: rgba(0,0,0,0.15);
      }
      .left-icon{
        margin-right: 6px;
        flex: 0 0 24px;
        width: 24px;
        font-size: .9em;
      }
      .tag{
        margin-left: 8px;
        margin-top: 2px;
      }
    }
  }
  .father{
    background-color: rgba(0,0,0,0.1);
    li{
      &>div{
        padding-left: 3em;
        color: rgba(var(--white), .7);
        font-size: .9em;
        &:hover{
          color: rgb(var(--primary));
        }
      }
      &.active{
        color: rgb(var(--primary));
        &>div{
          &::before{
            display: none;
          }
          &:hover{
            color: rgb(var(--primary));
          }
        }
      }
    }
  }
}
</style>