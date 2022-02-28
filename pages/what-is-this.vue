<template>
	<main>
		<section class="container pt-5 pt-lg-3">
			<div class="row align-items-center">
				<div class="col-md-6 mb-5">
					<h1>What is this?</h1>
					<h2>A Brutalist redesign of the infamous FBI's most wanted</h2>
					<p>
						The listing here are all real people wanted by the FBI. Completely
						static Jamstack site and regenerated twice a week. This is not a
						replacement for the real FBI most wanted listings! The real posters
						and law enforncement details are linked for every page.
					</p>
					<p>
						<code
							><strong>open source project, this is not the FBI!</strong></code
						>
					</p>
					<button class="p-2" @click="toGithub">To Github</button>
				</div>
				<div class="col-md-6 mb-2">
					<div class="d-flex flex-wrap justify-content-center">
						<img
							v-for="(image, index) in randomImages"
							:key="index"
							class="box extraImage"
							:src="image"
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'AboutPage',
	asyncData({ store }) {
		return { list: store.state.listing, query: store.state.filterList }
	},
	head() {
		return {
			title: `FBI Most Wanted | ${this.$route.path}`,
			meta: [
				{
					hid: 'og:title',
					property: 'og:title',
					content: `FBI Most Wanted | ${this.$route.path}`,
				},
				{
					hid: 'apple-mobile-web-app-title',
					property: 'apple-mobile-web-app-title',
					content: `FBI Most Wanted | ${this.$route.path}`,
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: `${this.randomImages[0]}`,
				},
				{
					hid: 'og:url',
					property: 'og:url',
					content: `https://fbi-fancy-listings.vercel.app${this.$route.fullPath}`,
				},
				{
					hid: 'twitter:card',
					property: 'twitter:card',
					content: `${this.randomImages[0]}`,
				},
				{
					hid: 'twitter:image',
					property: 'twitter:image',
					content: `${this.randomImages[0]}`,
				},
			],
		}
	},
	computed: {
		randomImages() {
			if (process.browser) {
				const imageList = []
				for (let index = 0; index < 9; index++) {
					const randomIndex = Math.floor(Math.random() * this.list.length)

					imageList.push(this.list[randomIndex].images[0].original)
				}
				return imageList
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
main {
	/* height: calc(100vh - 100px); */
	min-height: 100vh;
}
.about {
	margin-right: 25%;
}

.box {
	flex-grow: 1;

	padding: 1rem;
	border: 2px solid black;
	/* min-width: 25%; */
	background: var(--color-bg);
}
.extraImage {
	max-width: 30%;
	height: auto;
}
</style>