<template>
	<nav class="fluid-container">
		<div class="d-flex">
			<div>
				<h1 class="micro">FBI</h1>
				<h1 class="micro">most wanted</h1>
			</div>
			<div class="flex-grow-1"></div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'MainHeader',
}
</script>

<style scoped>
nav .d-flex > * {
	padding: 1rem;
	border: solid black 2px;
	height: 100px;
}
h1:nth-child(1) {
	font-size: var(--font-size-md);
}
h1:nth-child(2) {
	font-size: var(--font-size-sm);
}

nav {
	background: white;
	position: fixed;
	top: 0;
	width: 100%;
}
</style>