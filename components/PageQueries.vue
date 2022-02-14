<template>
	<div class="d-flex justify-content-around align-items-center">
		<button class="p-2" @click="prev">Previous</button>

		<a
			v-for="page in pages"
			:key="page"
			href="javascript: void(0)"
			@click="navigate(page)"
			>{{ page }}</a
		>

		<button class="p-2" @click="next">Next</button>
	</div>
</template>

<script>
export default {
	computed: {
		pages() {
			const max = Math.ceil(this.$store.state.listing.length / 10)

			const pages = []
			for (let index = 1; index <= max; index++) {
				pages.push(index)
			}
			console.log(pages)
			return pages
		},
	},
	methods: {
		prev() {
			this.$store.commit('updatePage', this.$store.state.currentPage - 1)
		},
		next() {
			this.$store.commit('updatePage', this.$store.state.currentPage + 1)
		},
		// back() {
		// 	this.$store.commit('updatePage', this.$store.state.currentPage - 1)

		// 	this.$router.push({
		// 		query: { page: this.$store.state.currentPage },
		// 	})
		// 	this.$store.dispatch('getCurrentListings')
		// },
		// forward() {
		// 	this.$store.commit('updatePage', this.$store.state.currentPage + 1)
		// 	this.$router.push({
		// 		query: { page: this.$store.state.currentPage },
		// 	})
		// 	this.$store.dispatch('getCurrentListings')
		// },
		navigate(page) {
			this.$store.commit('updatePage', page)
			this.$router.push({
				query: { page: this.$store.state.currentPage },
			})
			// this.$store.dispatch('getCurrentListings')
		},
	},
}
</script>

<style>
</style>