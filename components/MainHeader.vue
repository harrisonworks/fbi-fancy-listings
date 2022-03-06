<template>
	<nav class="fluid-container">
		<div class="d-flex">
			<div v-show="notHome" class="box">
				<button class="" @click="pressed">back</button>
			</div>

			<div v-show="!notHome" class="box d-none d-md-block">
				<h1 class="micro">FBI</h1>
				<h1 class="micro">most wanted</h1>
			</div>

			<div class="box">
				<button class="" @click="toggleCatergories">
					<div class="line"></div>
					<div class="line"></div>
					<div class="line"></div>
				</button>
			</div>

			<dynamic-marquee
				class="box p-0 d-none d-md-block"
				direction="row"
				:reverse="true"
				:repeat-margin="5"
				:hover-pause="false"
			>
				<div class="d-flex mt-4">
					<crime-chip v-show="status.title" color="black">{{
						status.title
					}}</crime-chip>
					<crime-chip v-show="status.caution">{{ status.caution }}</crime-chip>

					<crime-chip v-show="status.reward" color="blue">{{
						status.reward
					}}</crime-chip>
				</div>
			</dynamic-marquee>

			<div v-show="!notHome" class="box">
				<search-bar class="mt-2" />
			</div>

			<div v-show="notHome" class="box">
				<button class="" style="white-space: nowrap" @click="goToFbi">
					Official FBI Listing
				</button>
			</div>
		</div>
	</nav>
</template>

<script>
import { getStatusTitle } from '~/assets/js/utils.js'
export default {
	name: 'MainHeader',
	computed: {
		status() {
			return this.$store.state.headerInfo
		},
		notHome() {
			if (this.$route.path !== '/') return true
			return false
		},
		queryState() {
			return {
				filter: getStatusTitle(
					this.$store.state.subjectList,
					this.$store.state.filter.status
				),
				orderBy: this.$store.state.filter.order,
				groupBy: this.$store.state.filter.group,
				search: this.$store.state.filter.search,
			}
		},
	},
	methods: {
		async pressed() {
			await this.$store.dispatch('defaultHeader')
			await this.$router.push({
				path: '/',
				query: this.queryState,
			})
		},
		goToFbi() {
			window.open(this.$store.state.headerInfo.url, '_blank').focus()
		},
		toggleCatergories() {
			this.$store.commit('toggleCatergories')
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
	z-index: 2;
}

button {
	display: block;
	width: 100%;
	height: 100%;
}

.line {
	width: 35px;
	height: 4px;
	background-color: black;
	margin: 7px auto;
}
</style>