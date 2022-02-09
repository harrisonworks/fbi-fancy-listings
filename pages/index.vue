<template>
	<main class="container">
		<h1>most wanted</h1>

		<wanted-card
			v-for="(people, index) in peopleList"
			:key="index"
			:data="people"
		/>
	</main>
</template>

<script>
export default {
	name: 'IndexPage',
	// async asyncData({ store }) {
	// 	await store.dispatch('getListings')
	// },
	computed: {
		peopleList() {
			return this.$store.state.listing.items
		},
	},
}
</script>
