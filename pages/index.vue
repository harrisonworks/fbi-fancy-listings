<template>
	<main>
		<section class="container my-5">
			<div class="row align-items-center">
				<div class="col-lg-8">
					<h1>FBI most wanted</h1>
					<p>
						A Brutalist redesign of the infamous
						<a
							href="http://www.fbi.gov/wanted"
							target="_blank"
							rel="noopener noreferrer"
							>FBI's most wanted.</a
						>
						The listing here are all real people wanted by the FBI.
					</p>
					<p>
						<code
							><strong>Open source project, this is not the FBI!</strong></code
						>
					</p>
					<button class="p-2" @click="toGithub">To Github</button>
				</div>
				<div class="col-md-4">
					<div class="d-flex justify-content-end">
						<div style="text-align: right" class="mx-3">
							<h2 style="color: blue">{{ totalListings }}</h2>
							<p>Total Files</p>
						</div>

						<div style="text-align: right" class="mx-3">
							<h2 style="color: blue">{{ totalBounty }}</h2>
							<p>Total Bounty</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="container my-5">
			<div class="row">
				<div class="col-lg-12">
					<div class="box">
						<search-queries />
					</div>
				</div>
			</div>
		</section>
		<section class="container">
			<vue-masonry-wall :items="paginated" :options="options">
				<template v-slot:default="{ item }">
					<wanted-card :key="item.uid" :data="item" />
				</template>
				<!-- <wanted-card v-slot="{ people }" :key="people.uid" :data="people" /> -->
			</vue-masonry-wall>
			<!-- <div class="row g-3">
				<wanted-card
					v-for="people in paginated"
					:key="people.uid"
					:data="people"
				/>
			</div> -->
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
import numeral from 'numeral'
import VueMasonryWall from 'vue-masonry-wall'

import { findReward } from '~/assets/js/utils.js'
export default {
	name: 'IndexPage',
	components: { VueMasonryWall },
	data() {
		return {
			options: {
				width: 400,
				padding: {
					2: 8,
					default: 12,
				},
			},
		}
	},
	async asyncData({ payload, store }) {
		if (payload) {
			await store.commit('setListings', payload)
			await store.dispatch('filterList')
			await store.commit('setfilterListing', payload)
		} else {
			// recommiting what the server knows to the front
			await store.commit('setListings', store.state.listing)
			await store.dispatch('filterList')
			await store.commit('setfilterListing', store.state.filterList)
		}

		return { list: store.state.listing, query: store.state.filterList }
	},
	computed: {
		totalListings() {
			return this.$store.state.listing.length
		},
		totalBounty() {
			const list = this.$store.state.listing
			const rewards = list.map((item) => {
				return findReward(item.reward_text)
			})
			const getTotal = rewards.reduce((partialSum, a) => partialSum + a, 0)
			const formatedTotal = numeral(getTotal).format('($0a)')
			return formatedTotal
		},
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
		// console.log('Number of Listings:', this.peopleList.length)
	},
	methods: {
		toGithub() {
			window
				.open('https://github.com/harrisonworks/fbi-fancy-listings', '_blank')
				.focus()
		},
	},
}
</script>

<style scoped>
.box {
	height: auto;
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	background: var(--color-bg);
}

.card {
	transition: opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.card-enter-active {
	transition: opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-leave-active {
	transition: opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-enter, .card-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	/* transform: translateX(10px); */
	opacity: 0;
}
</style>