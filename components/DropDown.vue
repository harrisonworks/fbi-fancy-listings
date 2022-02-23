<template>
	<div ref="dropdownGroup" class="dropdown">
		<button v-click-outside="close" class="p-3" @click="open">Dropdown</button>
		<div ref="dropdown" class="dropdown-content box">
			<button
				v-for="(category, index) in items"
				:key="index"
				class="px-2 m-1"
				:class="{
					pressed: status === `${category.subjects[0]}`,
				}"
				@click="handleStatusFilter(category.subjects)"
			>
				{{ category.title }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: () => [{ title: 'Example', subjects: ['hey', 'ho'] }],
		},
	},
	methods: {
		open() {
			this.$refs.dropdown.classList.toggle('show')
		},
		close(e) {
			if (e.target !== this.$refs.dropdown) {
				this.$refs.dropdown.classList.remove('show')
			}
		},
	},
}
</script>

<style>
</style>