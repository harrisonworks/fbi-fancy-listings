

<template>
	<div>
		<main-header />
		<nuxt style="padding-top: 100px; padding-bottom: 100px" />
		<main-footer v-if="!isMobile" />
	</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
	methods: {
		isMobile() {
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			) {
				return true
			} else {
				return false
			}
		},
	},
}
</script>

<style>
</style>