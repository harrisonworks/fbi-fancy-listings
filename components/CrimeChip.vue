<template>
	<div class="crime-chip">
		<slot></slot>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.crime-chip {
	background: red;
	color: white;
	font-weight: 500;
	padding: 0.5rem 0.8rem;
	margin: 0.5rem 0.5rem 0.5rem 0rem;
}
</style>