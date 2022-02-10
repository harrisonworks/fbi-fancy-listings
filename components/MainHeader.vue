<template>
	<nav class="fluid-container">
		<div class="d-flex">
			<div v-show="notHome" class="box">
				<button @click="pressed">back</button>
			</div>
			<div class="box">
				<h1 class="micro">FBI</h1>
				<h1 class="micro">most wanted</h1>
			</div>

			<div v-show="notHome" class="box d-none d-sm-block">
				<div class="status">
					<h3>{{ status.title }}</h3>
					{{ status.caution }}
					{{ status.reward }}
				</div>
			</div>
			<!-- <div class="box col">
			
			</div> -->
		</div>
	</nav>
</template>

<script>
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
	},
	methods: {
		pressed() {
			this.$router.push('/')
		},
	},
}
</script>

<style scoped>
nav .d-flex > .box {
	height: 100px;
}
h1:nth-child(1) {
	font-size: var(--font-size-md);
}
h1:nth-child(2) {
	font-size: var(--font-size-sm);
}

.box {
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
</style>