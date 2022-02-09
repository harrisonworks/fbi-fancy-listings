<template>
	<div class="card my-5">
		<div class="d-flex flex-column">
			<div class="d-flex">
				<img class="m-3" :src="featuredImage" alt="" />
				<div class="d-flex flex-column m-3">
					<h6>{{ niceDate }}</h6>

					<h3>{{ data.title }}</h3>

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
					<a
						href="javascript: void(0)"
						style="margin-top: auto"
						@click="pressed"
						>Read More</a
					>
				</div>
			</div>
			<div class="status">
				<div v-show="data.warning_message" class="warning">
					{{ data.warning_message }}
				</div>
				<div v-show="reward" class="reward">{{ reward }}</div>
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
			const arrayCutoff = 3
			// this hack splits out the desciption into bullet points
			// I dont like regex 🤮
			const descriptionList = this.data.description
				.split(';')
				.join(',')
				.split('-')
				.join(',')
				.split(':')
				.join(',')
				.split(',')

			const lastItem = `${descriptionList.length - arrayCutoff} more...`

			if (descriptionList.length > arrayCutoff) {
				const temp = descriptionList.slice(0, arrayCutoff)
				temp.push(lastItem)
				return temp
			} else return descriptionList
		},
		reward() {
			if (this.data.reward_text) {
				const start = this.data.reward_text.indexOf('$')
				const end = this.data.reward_text.indexOf('for')

				const dollarAmount = this.data.reward_text.substring(start, end)
				return `${dollarAmount.trim()} reward`
			} else {
				return false
			}
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
	border: 2px solid black;
	padding: 0rem;
}

.crime-chip {
	background: red;
	color: white;
	font-weight: 500;
	padding: 0.5rem 0.8rem;
	margin: 0.5rem;
}

.status > * {
	padding: 1rem;
	text-align: center;
	font-weight: 500;
	/* border: 2px solid black; */
	box-sizing: border-box;
	color: white;
}

.warning {
	background: red;
}

.reward {
	background: blue;
}

img {
	height: 15rem;
	width: 10rem;

	object-fit: cover;
	border: solid black 2px;
}
</style>