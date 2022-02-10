<template>
	<main class="container">
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
	computed: {
		peopleList() {
			return this.$store.state.listing.items
		},
	},
	mounted() {
		// clear all the text in the header
		this.$store.commit('updateHeaderInfo', { ...null })
	},
}
</script>
