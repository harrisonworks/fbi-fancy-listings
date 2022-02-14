<template>
	<main>
		<section class="container my-5">
			<search-queries />
		</section>
		<section class="container">
			<wanted-card
				v-for="(people, index) in paginated"
				:key="index"
				:data="people"
			/>
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
	async asyncData({ route, store }) {
		if (route.query.page) {
			await store.commit('updatePage', route.query.page)
		}
	},
	data() {
		return {
			pageSize: 10,
		}
	},
	computed: {
		peopleList() {
			const fbiList = this.$store.state.listing
			// return only those that have a reward
			const result = fbiList.filter(this.currentFilter)

			this.$store.commit('setQueryListing', result)
			return result
		},
		indexStart() {
			return (this.$store.state.currentQuery.page - 1) * this.pageSize
		},
		indexEnd() {
			return this.indexStart + this.pageSize
		},
		paginated() {
			return this.peopleList.slice(this.indexStart, this.indexEnd)
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
