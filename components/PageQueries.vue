<template>
	<div class="d-flex justify-content-around align-items-center">
		<button class="p-2" @click="back">Previous</button>

		<a
			v-for="page in pages"
			:key="page"
			href="javascript: void(0)"
			@click="navigate(page)"
			>{{ page }}</a
		>

		<button class="p-2" @click="forward">Next</button>
	</div>
</template>

<script>
export default {
	computed: {
		pages() {
			const max = Math.ceil(this.$store.state.total / 20)
			const pages = []
			for (let index = 1; index <= max; index++) {
				pages.push(index)
			}

			return pages
		},
	},
	methods: {
		back() {
			this.$store.commit('updatePage', this.$store.state.currentPage - 1)
			this.$router.push({
				query: { page: this.$store.state.currentPage },
			})
			this.$store.dispatch('getListings')
		},
		forward() {
			this.$store.commit('updatePage', this.$store.state.currentPage + 1)
			this.$router.push({
				query: { page: this.$store.state.currentPage },
			})
			this.$store.dispatch('getListings')
		},
		navigate(page) {
			this.$store.commit('updatePage', page)
			this.$router.push({
				query: { page: this.$store.state.currentPage },
			})
			this.$store.dispatch('getListings')
		},
	},
}
</script>

<style>
</style>