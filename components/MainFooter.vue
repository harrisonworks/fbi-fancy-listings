<template>
	<footer class="fluid-container">
		<div class="d-flex">
			<dynamic-marquee
				:style="{ height: notHome && isNarrow ? '100px' : '0px' }"
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
		</div>
	</footer>
</template>

<script>
export default {
	name: 'MainFooter',
	computed: {
		status() {
			return this.$store.state.headerInfo
		},
		notHome() {
			if (this.$route.path !== '/') return true
			return false
		},
		isNarrow() {
			if (process.browser) {
				return window.innerWidth < 768
			}
			return false
		},
	},
}
</script>

<style scoped>
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
	background: var(--color-bg);
}

@media only screen and (max-width: 768px) {
	.box {
		border: 2px solid black;
	}
}

.box p {
	margin-bottom: 0;
}

footer {
	background: white;
	position: fixed;
	bottom: 0;
	width: 100%;
}

button {
	display: block;
	width: 100%;
	height: 100%;
}
</style>