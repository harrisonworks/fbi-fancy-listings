<template>
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
				<code><strong>Open source project, this is not the FBI!</strong></code>
			</p>

			<div class="d-flex">
				<div class="">
					<h2 style="color: blue">{{ totalListings.length }}</h2>
					<p>Wanted</p>
				</div>

				<div class="mx-5">
					<h2 style="color: blue">{{ totalBounty }}</h2>
					<p>Total Bounty</p>
				</div>
			</div>

			<button class="p-2" @click="toGithub">To Github</button>
		</div>

		<div class="col-lg-4 mb-2">
			<!-- <div class="d-flex flex-wrap justify-content-center">
				<img
					v-for="(image, index) in randomImages.images"
					:key="index"
					class="box extraImage"
					:src="image"
					alt=""
				/>
			</div> -->
		</div>
	</div>
</template>

<script>
import numeral from 'numeral'
import { findReward } from '~/assets/js/utils.js'

export default {
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