<template>
	<div class="d-flex justify-content-around align-items-center">
		<button class="p-2" @click="prev">Previous</button>
		<div class="d-flex flex-wrap">
			<a
				v-for="page in pages"
				:key="page"
				class="mx-2"
				href="javascript: void(0)"
				@click="navigate(page)"
				>{{ page }}</a
			>
		</div>

		<button class="p-2" @click="next">Next</button>
	</div>
</template>

<script>
export default {
	computed: {
		pages() {
			const max = Math.ceil(this.$store.state.queryList.length / 10)

			const pages = []
			for (let index = 1; index <= max; index++) {
				pages.push(index)
			}

			return pages
		},
	},
	methods: {
		prev() {
			this.$store.commit('updatePage', this.$store.state.currentQuery.page - 1)
			this.$router.push({
				query: { page: this.$store.state.currentQuery.page },
			})
		},
		next() {
			this.$store.commit('updatePage', this.$store.state.currentQuery.page + 1)
			this.$router.push({
				query: { page: this.$store.state.currentQuery.page },
			})
		},
		navigate(page) {
			this.$store.commit('updatePage', page)
			this.$router.push({
				query: { page: this.$store.state.currentQuery.page },
			})
		},
	},
}
</script>

<style>
</style>