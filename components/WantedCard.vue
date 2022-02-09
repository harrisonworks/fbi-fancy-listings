<template>
	<div class="card my-5">
		<div class="d-flex flex-column">
			<div class="d-flex">
				<img class="m-3" :src="featuredImage" alt="" />
				<div class="d-flex flex-column m-3">
					<h6 class="listingDate">{{ niceDate }}</h6>

					<a href="javascript: void(0)" @click="pressed"
						><h3>{{ data.title }}</h3></a
					>

					<div class="d-flex flex-wrap">
						<crime-chip v-for="(crime, index) in crimeList" :key="index">
							{{ crime }}
						</crime-chip>
					</div>

					<div class="d-flex flex-wrap">
						<p>{{ subjectsList }}</p>
					</div>

					<button style="margin-top: auto" @click="pressed">Read More</button>
				</div>
			</div>
			<div class="d-flex justify-content-evenly status">
				<div v-show="data.warning_message" class="flex-grow-1 warning">
					{{ data.warning_message }}
				</div>
				<div v-show="reward" class="flex-grow-1 reward">{{ reward }}</div>
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

				if (start === -1) return false

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

.listingDate {
	color: grey;
}

.status > * {
	padding: 0.5rem 0.8rem;
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

button {
	width: 15rem;
}

img {
	height: 15rem;
	width: 10rem;

	object-fit: cover;
	border: solid black 2px;
}
</style>