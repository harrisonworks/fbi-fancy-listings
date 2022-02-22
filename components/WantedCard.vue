<template>
	<div class="card my-3">
		<div class="d-flex flex-column">
			<div class="row">
				<div class="col-lg-2">
					<img class="m-lg-3" :src="featuredImage" />
				</div>
				<div class="col">
					<div class="d-flex flex-column m-3">
						<h6 class="listingDate">{{ niceDate }}</h6>

						<a class="cardHeader" @click="pressed"
							><h3>{{ data.title }}</h3></a
						>

						<div class="d-flex flex-wrap">
							<crime-chip v-for="(crime, index) in crimeList" :key="index">
								{{ crime }}
							</crime-chip>
						</div>

						<div class="d-flex flex-wrap">
							<crime-chip
								v-for="(subject, index) in data.subjects"
								:key="index"
								color="black"
							>
								{{ subject }}
							</crime-chip>
						</div>
						<button class="mt-3" @click="pressed">Read More</button>
					</div>
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
import { calculateReward } from '~/assets/js/utils.js'

export default {
	props: {
		data: {
			required: true,
			type: Object,
		},
	},
	computed: {
		featuredImage() {
			return this.$nuxt.context.isDev
				? `https://source.unsplash.com/500x800/?${this.data.subjects[0]}`
				: this.data.images[0].original
		},
		niceDate() {
			return formatDistanceToNow(new Date(this.data.publication), {
				addSuffix: true,
			})
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
			return calculateReward(this.data)
		},
	},
	mounted() {},
	methods: {
		pressed() {
			// header
			this.$store.commit('updateHeaderInfo', {
				title: this.data.title,
				caution: this.data.warning_message,
				reward: calculateReward(this.data),
				url: this.data.url,
			})
			// page
			this.$store.commit('setPage', this.data)

			this.$router.push({
				name: 'file-uid',
				params: { uid: this.data.uid },
			})
		},
	},
}
</script>

<style scoped>
.card {
	border: 2px solid black;
	padding: 0rem;
}

.cardHeader {
	text-decoration: underline;
	color: blue;
	cursor: pointer;
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
	display: inline-block;
}

img {
	height: 15rem;
	width: 10rem;

	object-fit: cover;
	border: solid black 2px;
}

/* mobile  */
@media only screen and (max-width: 768px) {
	img {
		height: 20rem;
		width: 100%;

		object-fit: cover;
		border: solid black 2px;
	}
}
</style>