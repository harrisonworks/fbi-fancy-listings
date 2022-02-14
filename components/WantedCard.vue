<template>
	<div class="card my-3">
		<div class="d-flex flex-column">
			<div class="row">
				<div class="col-lg-2">
					<img v-if="featuredImage" class="m-3" :src="featuredImage" />
					<img
						v-else
						class="m-3"
						src="https://source.unsplash.com/500x800/?crime"
					/>
				</div>
				<div class="col">
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
							<crime-chip
								v-for="(subject, index) in data.subjects"
								:key="index"
								color="black"
							>
								{{ subject }}
							</crime-chip>
							<!-- <p>{{ subjectsList }}</p> -->
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

export default {
	props: {
		data: {
			required: true,
			type: Object,
		},
	},
	computed: {
		featuredImage() {
			return this.data.images[0].original
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
				const regex =
					/\$[\d,]*(\.\d{2})?(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?|([\d]+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?(\sdollar\w*|\scent\w*)(\sand\s[\d]*\scent\w*)?)|(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|fifty|sixty|seventy|eighty|ninety)+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)*(\sdollars)/g
				const found = this.data.reward_text.match(regex)
				if (!found) {
					return 'reward not specified'
				} else {
					// correct that one record that is a sentence
					// this is bad needs to be fixed
					if (found[0].includes('one')) {
						// console.log(found[0])
						return '$1,000,000 REWARD'
					}

					if (found[0].includes('million')) {
						const millionIndex = found[0].indexOf('million')
						const editedFound = found[0]
							.substring(0, millionIndex - 1)
							.concat(',000,000')
						return `${editedFound} REWARD`
					}

					return `${found[0]} REWARD`
				}
			} else {
				return false
			}
		},
	},
	mounted() {},
	methods: {
		pressed() {
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
</style>