<template>
	<main class="fluid-container">
		<section class="row g-0 align-items-center">
			<div class="details col-lg-8 order-1 order-lg-0">
				<div class="box">
					<h1>{{ data.title }}</h1>

					<h5>
						Published: {{ formatedDates.published }} | Modified:
						{{ formatedDates.modified }}
					</h5>
					<crime-chip
						v-for="(subject, index) in subjectList"
						:key="index"
						color="black"
						class="d-inline-block"
						>{{ subject }}</crime-chip
					>
					<crime-chip color="blue" class="d-inline-block">{{
						reward
					}}</crime-chip>
				</div>
				<div class="box">
					<h4 v-show="!isVictim">Charges Description</h4>
					<h4 v-show="isVictim">Description</h4>
					<div class="d-flex flex-wrap">
						<crime-chip v-for="(crime, index) in crimeList" :key="index">{{
							crime
						}}</crime-chip>
					</div>
				</div>
				<div class="d-flex flex-wrap">
					<div class="box">
						<h5>Known Aliases: {{ aliasList }}</h5>
					</div>
					<div class="box">
						<p>Hair: {{ identity.hair }}</p>
					</div>
					<div class="box">
						<p>Eyes: {{ identity.eyes }}</p>
					</div>
					<div class="box">
						<p>Sex: {{ identity.sex }}</p>
					</div>
					<div class="box">
						<p>Nationality: {{ identity.nationality }}</p>
					</div>
					<div class="box">
						<p>Race: {{ identity.race }}</p>
					</div>
					<div v-show="data.scars_and_marks" class="box">
						<p>Scars and Marks: {{ data.scars_and_marks }}</p>
					</div>
				</div>
			</div>
			<div class="col-lg-4 d-flex justify-content-center">
				<img :src="featuredImage" class="featuredImage" alt="" />
			</div>
		</section>

		<div v-show="data.caution" class="box">
			<h3>Caution</h3>
			<div v-html="data.caution"></div>
			<div style="color: red" v-html="data.warning_message"></div>
		</div>

		<div class="d-flex flex-wrap">
			<div v-show="data.details" class="box col">
				<h3>Details</h3>
				<div v-html="data.details"></div>
			</div>
			<div v-show="data.remarks" class="box col">
				<h3>Remarks</h3>
				<div v-html="data.remarks"></div>
			</div>
			<div v-show="data.reward_text" class="box col">
				<h3>Reward</h3>
				<div v-html="data.reward_text"></div>
			</div>
		</div>

		<div class="box"><h3>Images</h3></div>

		<div class="d-flex flex-wrap">
			<img
				v-for="(image, index) in imageList"
				:key="index"
				class="box extraImage"
				:src="image"
				alt=""
			/>
		</div>

		<!-- <div class="d-flex flex-wrap">
			<div v-for="(node, index) in AllNodes" :key="index" class="box">
				{{ node }}
			</div>
		</div> -->
	</main>
</template>

<script>
import { format } from 'date-fns'
import { victimCheck, calculateReward, crimeSorter } from '~/assets/js/utils.js'

export default {
	name: 'FilePage',
	asyncData({ route, store, payload }) {
		if (payload) {
			return { uid: payload.uid, data: payload }
		} else {
			return {
				uid: route.params.uid,
				data: store.state.listing.find((el) => el.uid === route.params.uid),
			}
		}
	},
	data() {
		return {
			isVictim: false,
		}
	},
	head() {
		return {
			title: `FBI Most Wanted | ${this.data.title}`,
			meta: [
				{
					hid: 'og:title',
					property: 'og:title',
					content: `FBI Most Wanted | ${this.data.title}`,
				},
				{
					hid: 'twitter:card',
					property: 'twitter:card',
					content: this.data.images[0].original,
				},
				{
					hid: 'twitter:image',
					property: 'twitter:image',
					content: this.data.images[0].original,
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: this.data.images[0].original,
				},
			],
		}
	},
	computed: {
		identity() {
			return {
				hair: this.data.hair ? this.data.hair : 'Unlisted',
				eyes: this.data.eyes ? this.data.eyes : 'Unlisted',
				sex: this.data.sex ? this.data.sex : 'Unlisted',
				nationality: this.data.nationality ? this.data.nationality : 'Unlisted',
				race: this.data.race ? this.data.race : 'Unlisted',
			}
		},
		formatedDates() {
			return {
				published: format(new Date(this.data.publication), 'PPP'),
				modified: format(new Date(this.data.modified), 'PPP'),
			}
		},
		featuredImage() {
			return this.$nuxt.context.isDev
				? `https://source.unsplash.com/500x800/?${this.data.subjects[0]}`
				: this.data.images[0].original
		},
		imageList() {
			return this.$nuxt.context.isDev
				? [
						`https://source.unsplash.com/500x600/?${this.data.subjects[0]}`,
						`https://source.unsplash.com/300x600/?${this.data.subjects[0]}`,
				  ]
				: this.data.images
		},
		AllNodes() {
			const data = this.data
			const keys = Object.keys(this.data)
			const nodeList = []
			keys.forEach((key) => {
				if (key !== 'uid') {
					if (data[key]) {
						nodeList.push(key)

						nodeList.push(data[key])
					}
				}
			})
			return nodeList
		},
		subjectList() {
			// subjects are 'catergories' for law enforcement
			return this.data.subjects
		},
		crimeList() {
			return crimeSorter(this.data.description)
		},
		aliasList() {
			return this.data.aliases ? this.data.aliases.join(', ') : 'NA'
		},
		reward() {
			return calculateReward(this.data)
		},
	},
	mounted() {
		this.$store.commit('updateHeaderInfo', {
			title: this.data.title,
			caution: this.data.warning_message,
			reward: this.reward,
			url: this.data.url,
		})

		this.isVictim = victimCheck([...this.data.subjects, ...this.crimeList])
	},
	methods: {},
}
</script>

<style scoped>
.box {
	flex-grow: 1;

	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}

.box p {
	text-transform: capitalize;
	margin-bottom: 0;
}

section {
	background: black;
}

.featuredImage {
	border: 2px solid black;
}

.extraImage {
	/* max-width: 20%; */
	height: auto;
}
</style>