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
import { getStatusTitle } from '~/assets/js/utils.js'

export default {
	computed: {
		maxPage() {
			return Math.ceil(
				this.$store.state.filterList.length / this.$store.state.filter.pageLimit
			)
		},
		pages() {
			const pages = []
			for (let index = 1; index <= this.maxPage; index++) {
				pages.push(index)
			}

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
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,

					search: this.$store.state.filter.search,
				},
			})
		},
		next() {
			this.$store.commit('updatePage', this.$store.state.filter.page + 1)
			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,

					search: this.$store.state.filter.search,
				},
			})
		},
		navigate(page) {
			this.$store.commit('updatePage', page)
			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,

					search: this.$store.state.filter.search,
				},
			})
		},
	},
}
</script>

<style>
</style>