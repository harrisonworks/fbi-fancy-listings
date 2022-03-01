<template>
	<main>
		<section class="container my-5">
			<div class="row align-items-center">
				<div class="col-lg-6">
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

					<div class="d-flex">
						<div class="">
							<h2 style="color: blue">{{ totalListings.length }}</h2>
							<p>Total Files</p>
						</div>

						<div class="mx-5">
							<h2 style="color: blue">{{ totalBounty }}</h2>
							<p>Total Bounty</p>
						</div>
					</div>

					<button class="p-2" @click="toGithub">To Github</button>
				</div>

				<div class="col-lg-6 mb-2">
					<div class="d-flex flex-wrap justify-content-center">
						<img
							v-for="(image, index) in randomImages.images"
							:key="index"
							class="box extraImage"
							:src="image"
							alt=""
						/>
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
			<masonry-wall
				:items="paginated"
				:ssr-columns="3"
				:column-width="400"
				:gap="16"
			>
				<template #default="{ item }">
					<wanted-card :key="item.uid" :data="item" />
				</template>
			</masonry-wall>

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
import { findReward } from '~/assets/js/utils.js'
export default {
	name: 'IndexPage',
	async asyncData({ payload, store, query }) {
		if (payload) {
			await store.commit('setListings', payload)
			await store.dispatch('filterList')
			await store.commit('setfilterListing', payload)
		} else {
			// recommiting what the server knows to the front
			if (query) {
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

	computed: {
		totalListings() {
			return this.$store.state.listing
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
			const shortened = this.peopleList.slice(this.indexStart, this.indexEnd)
			return shortened
		},
		randomImages() {
			if (process.browser) {
				const imageList = []
				const urlList = []
				for (let index = 0; index < 6; index++) {
					const randomIndex = Math.floor(
						Math.random() * this.totalListings.length
					)

					imageList.push(this.totalListings[randomIndex].images[0].original)
					urlList.push(this.totalListings[randomIndex].url)
				}
				return { images: imageList, url: urlList }
			}
			return false
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
.extraImage {
	max-width: 30%;
	height: auto;
}
</style>