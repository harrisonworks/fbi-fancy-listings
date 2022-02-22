<template>
	<div class="d-flex justify-content-around align-items-center">
		<button class="p-2" :disabled="!state.back" @click="prev">Previous</button>
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

		<button class="p-2" :disabled="!state.forward" @click="next">Next</button>
	</div>
</template>

<script>
export default {
	computed: {
		maxPage() {
			return Math.ceil(
				this.$store.state.filterList.length / this.$store.state.filter.pageLimit
			)
		},
		pages() {
			// const max = Math.ceil(
			// 	this.$store.state.filterList.length / this.$store.state.filter.pageLimit
			// )

			const pages = []
			for (let index = 1; index <= this.maxPage; index++) {
				pages.push(index)
			}

			// const start = pages.slice(0, 3)

			// const end = pages.slice(pages.length - 3, pages.length - 1)

			// const newResult = [...start, ...end]

			return pages
		},
		state() {
			return {
				back: this.$store.state.filter.page > 1,
				forward: this.$store.state.filter.page <= this.maxPage - 1,
			}
		},
	},
	methods: {
		prev() {
			this.$store.commit('updatePage', this.$store.state.filter.page - 1)
			this.$router.push({
				query: { page: this.$store.state.filter.page },
			})
		},
		next() {
			this.$store.commit('updatePage', this.$store.state.filter.page + 1)
			this.$router.push({
				query: { page: this.$store.state.filter.page },
			})
		},
		navigate(page) {
			this.$store.commit('updatePage', page)
			this.$router.push({
				query: { page: this.$store.state.filter.page },
			})
		},
	},
}
</script>

<style>
</style>