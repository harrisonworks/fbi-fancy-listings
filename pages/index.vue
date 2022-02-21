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
import numeral from 'numeral'

import { victimCheck, crimeSorter } from '~/assets/js/utils.js'

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
			// if the store isnt available for whatever reason
			// get the query data from server
			// no idea why 🤷
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
				tags: `${this.$store.state.filter.status.join(', ')} `,
				search: `${this.$store.state.filter.search}`,
			}
		},
	},
	mounted() {
		// if landing on a page with a query update the store
		console.log('Number of Listings:', this.peopleList.length)
		// clear all the text in the header
	},
	methods: {
		rewardEvaluation(data) {
			if (data.reward_text) {
				const regex =
					/\$[\d,]*(\.\d{2})?(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?|([\d]+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?(\sdollar\w*|\scent\w*)(\sand\s[\d]*\scent\w*)?)|(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|fifty|sixty|seventy|eighty|ninety)+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)*(\sdollars)/g
				const found = data.reward_text.match(regex)
				if (!found) {
					return false
				} else {
					// correct that one record that is a sentence
					// this is bad needs to be fixed
					if (found[0].includes('one')) {
						// console.log(found[0])
						return '$1,000,000 REWARD'
					}

					if (found[0].includes('million')) {
						const millionIndex = found[0].indexOf('million')
						const editedFound = found[0]
							.substring(0, millionIndex - 1)
							.concat(',000,000')
						return numeral(editedFound)._value
					}

					return numeral(found[0])._value
				}
			} else {
				return false
			}
		},
		currentFilter(data) {
			// add the top ten most wanted
			// big dogs only 🐕

			// console.log('checking filter', data.subjects)
			if ([...data.subjects].includes('Ten Most Wanted Fugitives')) {
				return true
			}

			const crimeList = crimeSorter(data.description)
			// if reward is greater than $100,000 and they are not a victim
			if (
				this.rewardEvaluation(data) > 100000 &&
				!victimCheck([...data.subjects, ...crimeList])
			) {
				return true
			} else {
				return false
			}
		},
	},
}
</script>

<style scoped>
.card {
	transition: all 0.4s;
}
.card-enter,
.card-leave-to {
	opacity: 0;
}
.card-enter-to {
	opacity: 0;
}
</style>