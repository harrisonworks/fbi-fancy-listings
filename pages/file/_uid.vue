<template>
	<main>
		<h1>{{ data.title }}</h1>
		<img :src="data.images[0].large" alt="" />
		<h3>Wanted</h3>
		<p>{{ subjectsList }}</p>
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
	},
}
</script>

<style>
</style>