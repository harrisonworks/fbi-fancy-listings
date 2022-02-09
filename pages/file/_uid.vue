<template>
	<main class="fluid-container">
		<div class="d-flex">
			<div class="details">
				<div class="box">
					<h1>{{ data.title }}</h1>
				</div>
				<div class="box">
					<h4>Charges Description</h4>
					<div class="d-flex flex-wrap">
						<crime-chip v-for="(crime, index) in crimeList" :key="index">{{
							crime
						}}</crime-chip>
					</div>
				</div>
				<div class="d-flex flex-wrap">
					<div class="box">
						<h5>Hair: {{ data.hair }}</h5>
					</div>
					<div class="box">
						<h5>Eyes: {{ data.eyes }}</h5>
					</div>
					<div class="box">
						<h5>Sex: {{ data.sex }}</h5>
					</div>
					<div class="box">
						<h5>Nationality: {{ data.nationality }}</h5>
					</div>
				</div>
				<div class="d-flex flex-wrap">
					<div class="box"><h5>Known Aliases:</h5></div>
					<div class="box">
						<h5>{{ aliasList }}</h5>
					</div>
				</div>
			</div>
			<img class="featuredImage" :src="data.images[0].large" alt="" />
		</div>

		<div class="box">
			<h3>Full Listing</h3>
			<div v-html="data.caution"></div>
		</div>
	</main>
</template>

<script>
export default {
	name: 'FilePage',
	asyncData({ route, store }) {
		return { uid: route.params.uid, listings: store.state.listing.items }
	},
	head() {
		return {
			title: `FBI Most Wanted | ${this.data.title}`,
		}
	},
	computed: {
		data() {
			const data = this.listings.find((el) => el.uid === this.uid)
			return data
		},
		subjectsList() {
			// subjects are 'catergories' for law enforcement
			return this.data.subjects.join(', ')
		},
		crimeList() {
			const descriptionList = this.data.description
				.split(';')
				.join(',')
				.split(':')
				.join(',')
				.split(',')
			return descriptionList
		},
		aliasList() {
			if (this.data.aliases) {
				return this.data.aliases.join(', ')
			} else {
				return 'NA'
			}
		},
	},
}
</script>

<style scoped>
.box {
	padding: 1rem;
	border: 2px solid black;
}

.details {
	width: 65vw;
}

.featuredImage {
	width: 35vw;
	border: 2px solid black;
}
</style>