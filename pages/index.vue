<template>
	<main>
		<section class="container my-5">
			<search-queries />
		</section>
		<section class="container">
			<wanted-card
				v-for="(people, index) in peopleList"
				:key="index"
				:data="people"
			/>
		</section>
		<section class="container my-5">
			<page-queries />
		</section>
	</main>
</template>

<script>
export default {
	name: 'IndexPage',
	computed: {
		peopleList() {
			return this.$store.state.listing.slice(80, 100)
		},
	},
	mounted() {
		console.log(this.peopleList)
		// this.$router.push({
		// 	query: { page: this.$store.state.currentPage },
		// })

		// this.$store.dispatch('asyncCall')
		// clear all the text in the header
		this.$store.commit('updateHeaderInfo', { ...null })
	},
	methods: {},
}
</script>
