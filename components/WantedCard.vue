<template>
	<div class="card my-5">
		<div style="background: red; color: white">{{ data.warning_message }}</div>
		<div class="d-flex">
			<img class="m-3" :src="featuredImage" alt="" />
			<div class="d-flex flex-column m-3">
				<h3>{{ data.title }}</h3>
				<h5>{{ niceDate }}</h5>
				<h4>Details</h4>
				<div class="d-flex flex-wrap">
					<div
						class="crime-chip"
						v-for="(crime, index) in crimeList"
						:key="index"
					>
						{{ crime }}
					</div>
				</div>

				<h4>Catergories</h4>
				<div class="d-flex flex-wrap">
					<p class="crime-chip">{{ subjectsList }}</p>
				</div>
				<a href="javascript: void(0)" style="margin-top: auto" @click="pressed"
					>Read More</a
				>
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
		crimeList() {
			// this hack splits out the desciption into bullet points
			// I dont like regex 🤮
			return this.data.description
				.split(';')
				.join(',')
				.split('-')
				.join(',')
				.split(':')
				.join(',')
				.split(',')
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

.crime-chip {
	background: red;
	color: white;
	font-weight: 500;
	padding: 0.5rem 0.8rem;
	margin: 0.5rem;
}

img {
	max-width: 20rem;
	border: solid black 2px;
}
</style>