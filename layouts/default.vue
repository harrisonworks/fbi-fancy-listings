

<template>
	<div>
		<main-header />
		<nuxt class="homeStyle" style="" />
		<main-footer />
	</div>
</template>

<script>
export default {
	name: 'DefaultLayout',
	computed: {},
}
</script>

<style>
.homeStyle {
	padding-top: 100px;
	border: solid 2px black;
}

@media only screen and (max-width: 768px) {
	.homeStyle {
		padding-top: 100px;
		padding-bottom: 100px;
		border: solid 2px black;
	}
}
</style>