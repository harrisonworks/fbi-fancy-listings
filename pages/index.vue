<template>
	<main>
		<section id="top" class="container my-5">
			<home-header />
		</section>
		<section class="container my-5">
			<div class="row">
				<div class="col-lg-12">
					<search-queries />
				</div>
			</div>
		</section>
		<section class="container">
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
		</section>
		<section class="container my-5">
			<div v-show="noResults">
				<h4>No results to show</h4>
				<p>Total Results {{ peopleList.length }}</p>
				<p>
					Filtering with these tags:
					<em> {{ resultsMessage.tags }}</em> <br />
					Searching for: <em> {{ resultsMessage.search }}</em> <br />
					Showing Victims: <em> {{ resultsMessage.victim }} </em>
				</p>
				<button class="p-3"><a href="#top"> Back to Top</a></button>
			</div>
			<intersection-observer
				sentinal-name="sentinal-name"
				@on-intersection-element="onIntersectionElement"
			></intersection-observer>
		</section>
	</main>
</template>

<script>
import { debounce } from '~/assets/js/utils.js'
export default {
	name: 'IndexPage',
	async asyncData({ payload, store, query }) {
		if (payload) {
			await store.commit('setListings', payload)
			await store.dispatch('filterList')
			await store.commit('setfilterListing', payload)
		} else {
			// checking if object is empty
			if (Object.keys(query).length !== 0) {
				const queryPayload = {
					status: query.filter,
					search: query.search,
					order: query.orderBy,
					victim: store.state.showVictim,
				}
				await store.dispatch('queryFilter', queryPayload)
			}

			await store.commit('setListings', store.state.listing)
			await store.commit('setfilterListing', store.state.filterList)
		}
	},
	data() {
		return {
			noResults: false,
		}
	},

	computed: {
		pageLimit() {
			return this.$store.state.filter.pageLimit
		},
		peopleList() {
			return this.$store.state.filterList
		},
		indexStart() {
			return (this.$store.state.filter.page - 1) * this.pageLimit
		},
		indexEnd() {
			return this.indexStart + this.pageLimit
		},
		paginated() {
			const shortened = this.peopleList.slice(this.indexStart, this.indexEnd)
			return shortened
		},
		resultsMessage() {
			return {
				tags: `${this.$store.state.filter.status} `,
				search: `${this.$store.state.filter.search}`,
				victim: `${this.$store.state.filter.showVictim}`,
			}
		},
	},
	watch: {
		peopleList() {
			// reset state if people list change detected
			this.noResults = false
			this.$store.commit('setPageLimit', 25)
		},
	},
	mounted() {},
	methods: {
		onIntersectionElement: debounce(function (e) {
			if (
				this.$store.state.filter.pageLimit < this.$store.state.filterList.length
			) {
				this.$store.commit(
					'setPageLimit',
					this.$store.state.filter.pageLimit + 25
				)
			} else {
				this.noResults = true
			}
		}, 250),
	},
}
</script>

<style scoped>
button a {
	text-decoration: none;
	color: black;
}
</style>