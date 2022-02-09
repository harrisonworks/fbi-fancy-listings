<template>
	<div class="card">
		<div style="background: red; color: white">{{ data.warning_message }}</div>
		<div class="d-flex">
			<img :src="featuredImage" alt="" />
			<!-- <h4>he</h4> -->
			<div class="d-flex flex-column">
				<h3>{{ data.title }}</h3>
				<h5>{{ niceDate }}</h5>
				<p>descriptions</p>
				<!-- <p v-for="(subject, index) in data.subjects" :key="index"> -->
				<p>{{ subjectsList }}</p>
				<!-- </p> -->
				<a @click="pressed">Read More</a>
			</div>
		</div>
	</div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'

export default {
	props: {
		data: {
			required: true,
		},
	},
	computed: {
		featuredImage() {
			return this.data.images[0].large
		},
		niceDate() {
			return formatDistanceToNow(new Date(this.data.publication), {
				addSuffix: true,
			})
		},
		subjectsList() {
			// subjects are 'catergories' for law enforcement
			return this.data.subjects.join(', ')
		},
	},
	methods: {
		pressed() {
			this.$router.push({
				name: 'file-uid',
				params: { uid: this.data.uid },
			})
		},
	},
	mounted() {},
}
</script>

<style scoped>
.card {
	border: solid black 2px;
	padding: 1rem;
}

img {
	max-width: 20rem;
}
</style>