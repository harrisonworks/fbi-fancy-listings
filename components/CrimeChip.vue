<template>
	<div :style="{ backgroundColor: color }" class="crime-chip">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'red',
		},
	},
}
</script>

<style scoped>
.crime-chip {
	/* background: red; */
	color: white;
	font-weight: 500;
	padding: 0.5rem 0.8rem;
	white-space: nowrap;
	margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}

@media only screen and (max-width: 768px) {
	.crime-chip {
		/* background: red; */
		color: white;
		font-weight: 500;
		padding: 0.5rem 0.8rem;
		white-space: normal;
		margin: 0.5rem 0.5rem 0.5rem 0.5rem;
	}
}
</style>