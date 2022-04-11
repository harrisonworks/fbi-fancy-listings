<template>
	<main class="fluid-container">
		<section class="row g-0 align-items-center">
			<div class="details col-lg-8 order-1 order-lg-0">
				<div class="box">
					<h1>{{ currentFile.title }}</h1>

					<h5>
						Published: {{ formatedDates.published }} | Modified:
						{{ formatedDates.modified }}
					</h5>
					<div class="d-flex flex-wrap">
						<crime-chip
							v-for="(subject, index) in subjectList"
							:key="index"
							color="black"
							>{{ subject }}</crime-chip
						>
						<crime-chip v-show="reward" color="blue">{{ reward }}</crime-chip>

						<crime-chip v-show="isVictim" color="yellow" text="black"
							>VICTIM</crime-chip
						>
						<crime-chip v-show="isCaptured" color="green">CAPTURED</crime-chip>
					</div>
				</div>
				<div v-show="crimeList" class="box">
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
						<h5>Hair: {{ identity.hair }}</h5>
					</div>
					<div class="box">
						<h5>Eyes: {{ identity.eyes }}</h5>
					</div>
					<div class="box">
						<h5>Sex: {{ identity.sex }}</h5>
					</div>
					<div class="box">
						<h5>Nationality: {{ identity.nationality }}</h5>
					</div>
					<div class="box">
						<h5>Race: {{ identity.race }}</h5>
					</div>
					<div v-show="currentFile.scars_and_marks" class="box">
						<h5>
							Scars and Marks:
							{{ currentFile.scars_and_marks }}
						</h5>
					</div>
				</div>
			</div>
			<div class="col-lg-4 d-flex justify-content-center">
				<img :src="featuredImage" class="featuredImage" alt="" />
			</div>
		</section>

		<div v-show="currentFile.caution" class="box">
			<h3>Caution</h3>
			<div v-sanitize="currentFile.caution"></div>
			<div v-sanitize="currentFile.warning_message" style="color: red"></div>
		</div>

		<div class="d-flex flex-wrap">
			<div v-show="currentFile.details" class="box col-lg col-sm-12">
				<h3>Details</h3>
				<div v-sanitize="currentFile.details"></div>
			</div>
			<div v-show="currentFile.remarks" class="box col-lg col-sm-12">
				<h3>Remarks</h3>
				<div v-sanitize="currentFile.remarks"></div>
			</div>
			<div v-show="currentFile.reward_text" class="box col-lg col-sm-12">
				<h3>Reward</h3>
				<div v-sanitize="currentFile.reward_text"></div>
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
		<!-- checkout all the nodes -->
		<!-- <all-nodes :data="data" /> -->
	</main>
</template>

<script>
import { format } from 'date-fns'
import { calculateReward, crimeSorter, victimCheck } from '~/assets/js/utils.js'

export default {
	name: 'FilePage',
	async asyncData({ payload, store, params }) {
		// for generation
		if (payload) {
			await store.commit('updateHeaderInfo', {
				title: payload.title,
				caution: payload.warning_message,
				reward: calculateReward(payload.reward_text),
				url: payload.url,
			})

			await store.commit('setCurrentFile', payload)
			return { data: payload, uid: payload.uid }
		}
	},
	head() {
		return {
			title: `FBI Most Wanted | ${this.currentFile.title}`,
			meta: [
				{
					hid: 'og:title',
					property: 'og:title',
					content: `FBI Most Wanted | ${this.currentFile.title}`,
				},
				{
					hid: 'apple-mobile-web-app-title',
					property: 'apple-mobile-web-app-title',
					content: `FBI Most Wanted | ${this.currentFile.title}`,
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: `${this.currentFile.images[0].original}`,
				},
				{
					hid: 'og:url',
					property: 'og:url',
					content: `https://fbi-fancy-listings.vercel.app${this.$route.fullPath}`,
				},
				{
					hid: 'twitter:card',
					property: 'twitter:card',
					content: `${this.currentFile.images[0].original}`,
				},
				{
					hid: 'twitter:image',
					property: 'twitter:image',
					content: `${this.currentFile.images[0].original}`,
				},
			],
		}
	},
	computed: {
		currentFile() {
			return this.$store.state.currentFile
		},
		identity() {
			return {
				hair: this.currentFile.hair ? this.currentFile.hair : 'Unlisted',
				eyes: this.currentFile.eyes ? this.currentFile.eyes : 'Unlisted',
				sex: this.currentFile.sex ? this.currentFile.sex : 'Unlisted',
				nationality: this.currentFile.nationality
					? this.currentFile.nationality
					: 'Unlisted',
				race: this.currentFile.race ? this.currentFile.race : 'Unlisted',
			}
		},
		caution() {
			// return this.$sanitize(this.currentFile.caution)
			return null
		},
		formatedDates() {
			return {
				published: this.currentFile.publication
					? format(new Date(this.currentFile.publication), 'PPP')
					: 'Undefined',
				modified: this.currentFile.publication
					? format(new Date(this.currentFile.modified), 'PPP')
					: 'Undefined',
			}
		},
		featuredImage() {
			return this.$nuxt.context.isDev
				? `https://source.unsplash.com/500x800/?${this.currentFile.subjects[0]}`
				: this.currentFile.images[0].original
		},
		imageList() {
			return this.$nuxt.context.isDev
				? [
						`https://source.unsplash.com/500x600/?${this.currentFile.subjects[0]}`,
						`https://source.unsplash.com/300x600/?${this.currentFile.subjects[0]}`,
						`https://source.unsplash.com/200x500/?${this.currentFile.subjects[0]}`,
						`https://source.unsplash.com/1000x400/?${this.currentFile.subjects[0]}`,
				  ]
				: this.currentFile.images.map((image) => image.original)
		},
		subjectList() {
			// subjects are 'catergories' for law enforcement
			return this.currentFile.subjects
		},
		crimeList() {
			return this.currentFile.description
				? crimeSorter(this.currentFile.description)
				: null
		},
		aliasList() {
			return this.currentFile.aliases
				? this.currentFile.aliases.join(', ')
				: 'NA'
		},
		reward() {
			return this.currentFile.reward_text
				? calculateReward(this.currentFile.reward_text)
				: null
		},
		isVictim() {
			return this.currentFile.description
				? victimCheck([...this.crimeList, ...this.subjectList])
				: null
		},
		isCaptured() {
			if (this.currentFile.status !== 'na') {
				return 'CAPTURED'
			}
			return false
		},
	},
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
	min-width: none;
	height: auto;
}
</style>