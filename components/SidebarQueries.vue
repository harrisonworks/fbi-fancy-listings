<template>
	<div
		class="box d-md-block"
		:style="
			showCatergories
				? 'position: fixed; display: block; top: 100px; left: 0px; width: 100%; z-index:10; '
				: 'display: none;'
		"
	>
		<div class="row align-items-center">
			<div class="col-lg-12">
				<h4 class="my-3">Catergories</h4>

				<div class="d-flex flex-wrap flex-md-column">
					<button
						v-for="(category, index) in subjectList"
						:key="index"
						class="py-2 m-1"
						:class="{
							pressed: status[0] === `${category.subjects[0]}`,
						}"
						@click="handleStatusFilter(category.subjects)"
					>
						{{ category.title }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import { getStatusTitle } from '~/assets/js/utils.js'

export default {
	computed: {
		showCatergories() {
			if (process.browser) {
				return this.$store.state.showCatergories && window.innerWidth < 768
			}

			return this.$store.state.showCatergories
		},
		subjectList() {
			return this.$store.state.subjectList
		},
		status() {
			return this.$store.state.filter.status
		},
		search() {
			return this.$store.state.filter.search
		},
		catergoryText() {
			return getStatusTitle(this.subjectList, this.$store.state.filter.status)
		},
	},
	mounted() {},
	methods: {
		handleStatusFilter(status) {
			if (this.showCatergories) {
				this.$store.commit('toggleCatergories')
			}
			this.$store.dispatch('filterStatus', status)
			// this.$store.commit('setPage', 1)
			// find the object which matches the filters in the store
			this.$router.push({
				query: {
					filter: getStatusTitle(
						this.$store.state.subjectList,
						this.$store.state.filter.status
					),
					orderBy: this.$store.state.filter.order,
					groupBy: this.$store.state.filter.group,
					search: this.$store.state.filter.search,
				},
			})
		},
	},
}
</script>

<style scoped>
.box {
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}

.dropdown {
	position: relative;
	display: inline-block;
	/* z-index: 1; */
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: var(--color-bg);
	min-width: 25rem;
	overflow: auto;
	z-index: 1;
}

@media only screen and (max-width: 768px) {
}

.dropdown-content a {
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
}

.dropdown a:hover {
	background-color: #ddd;
}

.show {
	display: block;
}
</style>