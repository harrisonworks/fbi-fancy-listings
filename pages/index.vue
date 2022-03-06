<template>
	<main>
		<section id="top" class="container my-5">
			<home-header />
		</section>
		<section class="container my-5">
			<div class="row">
				<div class="col-lg-12"></div>
			</div>
		</section>
		<section class="container-fluid">
			<div class="row">
				<div class="col-lg-2">
					<sidebar-queries />
				</div>
				<div class="col">
					<div class="mb-5">
						<status-bar />
					</div>
					<masonry-wall
						:items="paginated"
						:ssr-columns="3"
						:column-width="350"
						:gap="16"
					>
						<template #default="{ item }">
							<wanted-card :key="item.uid" :data="item" />
						</template>
					</masonry-wall>

					<div v-show="noResults" class="ms-3 my-5">
						<h4 v-show="peopleList.length !== 0">No More Results</h4>

						<h4 v-show="peopleList.length === 0">No Results</h4>

						<p>
							Filtering with these tags:
							<em> {{ resultsMessage.tags }}</em> <br />
							Searching for: <em> {{ resultsMessage.search }}</em> <br />
							Group By: <em> {{ resultsMessage.group }} </em>
						</p>
						<button class="p-2" @click="filterReset">Clear Filters</button>
					</div>
					<intersection-observer
						sentinal-name="bottomPage"
						@on-intersection-element="onIntersectionElement"
					></intersection-observer>
				</div>
			</div>
		</section>
		<section class="container my-5"></section>
	</main>
</template>

<script>
import { debounce, getStatusTitle } from '~/assets/js/utils.js'
export default {
	name: 'IndexPage',
	async asyncData({ payload, store, query }) {
		if (payload) {
			await store.commit('setListings', payload)
			await store.dispatch('filterList')

			await store.commit('setfilterListing', payload)
		} else {
			// filter the list
			await store.commit('setListings', store.state.listing)
			await store.dispatch('filterList')

			await store.commit('setfilterListing', store.state.filterList)

			return { subjectList: store.state.subjectList }
		}
	},
	data() {
		return {
			noResults: false,
		}
	},
	computed: {
		queryState() {
			// console.log(this.subjectList, this.$route.query.filter)
			return {
				page: this.$route.query.page,
				filter: this.$route.query.filter,
				orderBy: this.$route.query.orderBy,
				groupBy: this.$route.query.groupBy,
				search: this.$route.query.search,
			}
		},
		pageLimit() {
			return this.$store.state.filter.pageLimit
		},
		peopleList() {
			return this.$store.state.filterList
		},
		paginated() {
			const shortened = this.peopleList.slice(0, this.pageLimit)
			return shortened
		},
		resultsMessage() {
			return {
				tags: `${this.$store.state.filter.status} `,
				search: `${this.$store.state.filter.search}`,
				group: `${this.$store.state.filter.group}`,
			}
		},
	},
	watch: {
		peopleList() {
			// reset state if people list change detected
			this.noResults = false
			this.$store.commit('setPageLimit', 10)
		},
	},
	async mounted() {
		// if there is a query make sure it applies to the filter
		if (Object.keys(this.$route.query).length !== 0) {
			await this.$store.dispatch('queryFilter', this.queryState)
		}
	},
	methods: {
		async filterReset() {
			await this.$store.dispatch('resetFilter')

			await this.$router.push({
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
		onIntersectionElement: debounce(function (e) {
			if (this.pageLimit < this.peopleList.length) {
				this.$store.commit(
					'setPageLimit',
					this.$store.state.filter.pageLimit + 10
				)
			} else {
				this.noResults = true
			}
		}, 50),
	},
}
</script>

<style scoped>
button a {
	text-decoration: none;
	color: black;
}
</style>