<template>
	<div>
		<div class="d-flex flex-column card">
			<div class="row">
				<div class="col-lg-12">
					<img :src="featuredImage" />
				</div>
				<div class="col-lg-12">
					<div class="d-flex flex-column m-3">
						<h6 class="listingDate">{{ niceDate }}</h6>

						<a class="cardHeader" @click="pressed"
							><h4>{{ data.title }}</h4></a
						>

						<div class="d-flex flex-column">
							<div v-show="crimeList" class="d-flex flex-wrap">
								<crime-chip
									v-for="(crime, index) in crimeList"
									:key="index"
									style="white-space: normal"
								>
									{{ crime }}
								</crime-chip>
							</div>

							<div class="d-flex flex-wrap">
								<crime-chip
									v-for="(subject, index) in data.subjects"
									:key="index"
									style="white-space: normal"
									color="black"
								>
									{{ subject }}
								</crime-chip>
							</div>
							<button class="m-3 p-2 p-lg-0" @click="pressed">Read More</button>
						</div>
					</div>
				</div>
			</div>

			<div
				class="
					d-flex
					align-items-stretch align-items-center
					justify-content-evenly
					status
				"
			>
				<div v-show="data.warning_message" class="flex-grow-1 warning">
					{{ data.warning_message }}
				</div>
				<div v-show="reward" class="flex-grow-1 reward">{{ reward }}</div>
				<div
					v-show="victim"
					class="flex-grow-1"
					style="background-color: yellow; color: black"
				>
					VICTIM
				</div>

				<div v-show="isCaptured" class="flex-grow-1 captured">CAPTURED</div>
			</div>
		</div>
	</div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import { calculateReward, victimCheck } from '~/assets/js/utils.js'

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
		order() {
			return this.$store.state.filter.order
		},
		niceDate() {
			if (this.order === 'recently_updated') {
				return (
					'updated ' +
					formatDistanceToNow(new Date(this.data.modified), {
						addSuffix: true,
					})
				)
			}

			return (
				'published ' +
				formatDistanceToNow(new Date(this.data.publication), {
					addSuffix: true,
				})
			)
		},
		isCaptured() {
			if (this.data.status !== 'na') {
				return 'CAPTURED'
			}
			return false
		},
		crimeList() {
			if (this.data.description) {
				const arrayCutoff = 2
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
			}

			return false
		},
		reward() {
			return calculateReward(this.data.reward_text)
		},
		victim() {
			const descriptionList = this.data.description
				.split(';')
				.join(',')
				.split(':')
				.join(',')
				.split(',')

			// console.log(descriptionList)
			if (victimCheck(this.data.subjects) || victimCheck(descriptionList)) {
				return true
			}
			return false
		},
	},
	mounted() {},
	methods: {
		pressed() {
			// header
			this.$store.commit('updateHeaderInfo', {
				title: this.data.title,
				caution: this.data.warning_message,
				reward: calculateReward(this.data.reward_text),
				url: this.data.url,
			})
			// page
			this.$store.commit('setCurrentFile', this.data)

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
	/* height: 100%; */
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

.captured {
	background: green;
}

button {
	width: 15rem;
	display: inline-block;
}

img {
	background: blue;
	height: 20rem;
	width: 100%;
	/* width: 10rem; */

	object-fit: cover;
	border: solid black 2px;
}

/* mobile  */
@media only screen and (max-width: 768px) {
	img {
		height: 15rem;
		width: 100%;

		object-fit: cover;
		border: solid black 2px;
	}
}
</style>