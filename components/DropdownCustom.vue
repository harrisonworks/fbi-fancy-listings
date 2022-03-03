<template>
	<div class="dropdown m-2">
		<button v-click-outside="closeCat" class="p-3" @click="openCat">
			Category: {{ catergoryText }}
		</button>
		<div ref="dropdownCat" class="dropdown-content box">
			<div class="d-flex flex-wrap">
				<button
					v-for="(category, index) in subjectList"
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
	</div>
</template>

<script>
export default {}
</script>

<style>
</style>