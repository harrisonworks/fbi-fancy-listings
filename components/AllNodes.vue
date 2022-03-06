<template>
	<div class="d-flex flex-wrap">
		<div v-for="(node, index) in AllNodes" :key="index" class="box">
			<div class="d-flex flex-wrap">
				<h5 class="mb-0 me-3">{{ node.key }}:</h5>
				<p class="m-0">{{ node.data }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			required: true,
			type: Object,
		},
	},
	computed: {
		AllNodes() {
			// Just to have a look at whats on offer
			const data = this.data
			const keys = Object.keys(this.data)
			const nodeList = []
			keys.forEach((key) => {
				if (key !== 'uid') {
					if (data[key]) {
						nodeList.push({
							key,
							data: data[key],
						})
					}
				}
			})
			return nodeList
		},
	},
}
</script>

<style>
</style>