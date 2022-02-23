<template>
	<main>
		<section class="container my-5">
			<search-queries />
		</section>
		<section class="container">
			<transition-group name="card" tag="div">
				<wanted-card
					v-for="people in paginated"
					:key="people.uid"
					:data="people"
				/>
			</transition-group>
			<div v-show="paginated.length === 0">
				<h4>No Results</h4>
				<p>
					Filtering with these tags:
					<em> {{ resultsMessage.tags }}</em> <br />
					Searching for: <em> {{ resultsMessage.search }}</em>
				</p>
			</div>
		</section>
		<section class="container my-5">
			<page-queries />
		</section>
	</main>
</template>

<script>
export default {
	name: 'IndexPage',
	async asyncData({ payload, store }) {
		if (payload) {
			await store.commit('updateListings', payload)
			await store.commit('setfilterListing', payload)
		} else {
			// recommiting what the server knows to the front
			await store.commit('updateListings', store.state.listing)
			await store.commit('setfilterListing', store.state.filterList)
		}
		return { list: store.state.listing, query: store.state.filterList }
	},
	computed: {
		pageLimit() {
			return this.$store.state.filter.pageLimit
		},
		peopleList() {
			// const list = this.$store.state.filterList.reduce((p, c) => {
			// 	p[c.uid] = c
			// 	return p
			// }, {})
			// return Object.values(list).sort((a, b) => a.uid.localeCompare(b.uid))

			return this.$store.state.filterList
		},
		indexStart() {
			return (this.$store.state.filter.page - 1) * this.pageLimit
		},
		indexEnd() {
			return this.indexStart + this.pageLimit
		},
		paginated() {
			return this.peopleList.slice(this.indexStart, this.indexEnd)
		},
		resultsMessage() {
			return {
				tags: `${this.$store.state.filter.status} `,
				search: `${this.$store.state.filter.search}`,
			}
		},
	},
	mounted() {
		// if landing on a page with a query update the store
		console.log('Number of Listings:', this.peopleList.length)
	},
	methods: {},
}
</script>

<style scoped>
.card {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.card-enter-active {
	transition: all 0.3s ease;
}
.card-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-enter, .card-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	/* transform: translateX(10px); */
	opacity: 0;
}
</style>