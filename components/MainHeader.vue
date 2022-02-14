<template>
	<nav class="fluid-container">
		<div class="d-flex">
			<div v-show="notHome" class="box">
				<button @click="pressed">back</button>
			</div>

			<div v-show="!notHome" class="box">
				<h1 class="micro">FBI</h1>
				<h1 class="micro">most wanted</h1>
			</div>

			<div v-show="!notHome" class="box">
				<button style="white-space: nowrap" @click="pressed">
					Ten Most Wanted Fugitives
				</button>
			</div>

			<!-- <div v-show="notHome" class="box d-none d-sm-block">
				<div class="status">
					<h3>{{ status.title }}</h3>
					<crime-chip style="display: inline-block">{{
						status.caution
					}}</crime-chip>
					<crime-chip color="blue" style="display: inline-block">{{
						status.reward
					}}</crime-chip>
				</div>
			</div> -->

			<dynamic-marquee
				class="box p-0"
				direction="row"
				:reverse="true"
				:repeat-margin="5"
				:hover-pause="false"
			>
				<div class="d-flex mt-4">
					<crime-chip
						v-show="status.title"
						color="black"
						style="white-space: nowrap"
						>{{ status.title }}</crime-chip
					>
					<crime-chip v-show="status.caution" style="white-space: nowrap">{{
						status.caution
					}}</crime-chip>

					<crime-chip
						v-show="status.reward"
						style="white-space: nowrap"
						color="blue"
						>{{ status.reward }}</crime-chip
					>
				</div>
			</dynamic-marquee>
			<div v-show="notHome" class="box">
				<button @click="goToFbi">FBI's Listing</button>
			</div>
		</div>
	</nav>
</template>

<script>
import DynamicMarquee from 'vue-dynamic-marquee'

export default {
	name: 'MainHeader',
	components: { DynamicMarquee },
	computed: {
		status() {
			return this.$store.state.headerInfo
		},
		notHome() {
			if (this.$route.path !== '/') return true
			return false
		},
	},
	methods: {
		pressed() {
			this.$store.commit('updateHeaderInfo', { ...null })

			this.$router.push({
				path: '/',
				query: { page: this.$store.state.currentQuery.page },
			})
		},
		goToFbi() {
			window.open(this.$store.state.headerInfo.url, '_blank').focus()
		},
	},
}
</script>

<style scoped>
nav .d-flex > .box {
	height: 100px !important;
}
h1:nth-child(1) {
	font-size: var(--font-size-md);
}
h1:nth-child(2) {
	font-size: var(--font-size-sm);
}

.box {
	height: auto;
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	background: var(--color-bg);
}

.box p {
	margin-bottom: 0;
}

nav {
	background: white;
	position: fixed;
	top: 0;
	width: 100%;
}

button {
	display: block;
	width: 100%;
	height: 100%;
}
</style>