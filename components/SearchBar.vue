<template>
	<div class="d-flex">
		<input
			ref="searchField"
			class="mx-2 p-3 search-bar"
			:value="search"
			type="search"
			placeholder="Search the most wanted"
			aria-label="Search the most wanted"
			@input="handleSearch"
		/>
	</div>
</template>

<script>
import { debounce, getStatusTitle } from '~/assets/js/utils.js'
export default {
	computed: {
		search() {
			return this.$store.state.filter.search
		},
	},
	methods: {
		handleSearch: debounce(function (e) {
			this.$store.dispatch('filterSearch', this.$refs.searchField.value)
			this.$store.commit('setPage', 1)

			this.$router.push({
				path: '/',
				query: {
					page: this.$store.state.filter.page,
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,
					groupBy: this.$store.state.filter.group,
					search: this.$refs.searchField.value,
				},
			})
		}, 500),
	},
}
</script>

<style scoped>
.search-bar {
	width: 28rem;
}

@media only screen and (max-width: 768px) {
	.search-bar {
		width: auto;
	}
}
</style>