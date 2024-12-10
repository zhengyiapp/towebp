<template>
  <div class="dhy-notice f ac">
    <span class="icon mr6"><IconVoice /></span>
    <div class="fa w0">
      <div v-html="content" :style="{'animation-duration':`${content.length/3}s`}"></div>
    </div>
  </div>
</template>

<script setup>
import IconVoice from '@/components/icon/voice.vue'
defineProps({
  content: String
})
</script>

<style lang="scss">
.dhy-notice{
	background-color: #fffcd6;
	color: rgb(var(--warning));
	padding: .6em 1em;
	border-radius: .5em;
	.icon{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 20px;
		height: 20px;
		border-radius: 10px;
		background-color: #ff5473;
		color: #fff;
		margin-right: 1em;
		svg{
			fill: #fff;
		}
	}
	p{
		margin: 0;
	}
	.fa{
		overflow: hidden;
		&>div{
			animation: marqueScroll 10s linear infinite;
			animation-delay: 1s;
			white-space: nowrap;
			width: fit-content;
		}
	}
}
@keyframes marqueScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width:640px) {
	.dhy-notice{
		font-size: 12px;
		padding: .3em .5em;
	}
}
</style>