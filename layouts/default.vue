

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
	padding-top: 98px;
	border: solid 2px black;
}

@media only screen and (max-width: 768px) {
	.homeStyle {
		padding-top: 98px;
		padding-bottom: 98px;
		border: solid 2px black;
	}
}
</style>