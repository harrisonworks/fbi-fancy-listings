<template>
	<main class="fluid-container">
		<div class="row g-0">
			<div class="details col-lg-8 order-1 order-lg-0">
				<div class="box">
					<h1>{{ data.title }}</h1>

					<h5>{{ formatedDate }}</h5>
					<crime-chip
						v-for="(crime, index) in subjectList"
						:key="index"
						class="d-inline-block"
						>{{ crime }}</crime-chip
					>
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
						<p>Hair: {{ data.hair }}</p>
					</div>
					<div class="box">
						<p>Eyes: {{ data.eyes }}</p>
					</div>
					<div class="box">
						<p>Sex: {{ data.sex }}</p>
					</div>

					<div class="box">
						<p>Nationality: {{ data.nationality }}</p>
					</div>
					<div class="box">
						<p>Race: {{ data.race }}</p>
					</div>
					<div class="box">
						<p>Scars and Marks: {{ data.scars_and_marks }}</p>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<img class="featuredImage" :src="data.images[0].original" alt="" />
			</div>
		</div>

		<div class="box">
			<h3>Caution</h3>
			<div v-html="data.caution"></div>
			<div style="color: red" v-html="data.warning_message"></div>
		</div>

		<div class="d-flex flex-wrap">
			<div class="box col">
				<h3>Details</h3>
				<div v-html="data.remarks"></div>
			</div>
			<div class="box col">
				<h3>Reward</h3>
				<div v-html="data.reward_text"></div>
			</div>
		</div>

		<div class="box"><h5>Gallery</h5></div>

		<div class="d-flex flex-wrap">
			<img
				v-for="(image, index) in imageList"
				:key="index"
				class="box extraImage"
				:src="image.original"
				alt=""
			/>
		</div>

		<div class="d-flex flex-wrap">
			<div v-for="(node, index) in AllNodes" :key="index" class="box">
				{{ node }}
			</div>
		</div>
	</main>
</template>

<script>
import { format } from 'date-fns'

export default {
	name: 'FilePage',
	asyncData({ route, store }) {
		return { uid: route.params.uid, listings: store.state.listing.items }
	},
	head() {
		return {
			title: `FBI Most Wanted | ${this.data.title}`,
		}
	},
	computed: {
		data() {
			const data = this.listings.find((el) => el.uid === this.uid)
			return data
		},
		formatedDate() {
			return format(new Date(this.data.publication), 'PPP')
		},
		imageList() {
			return this.data.images
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
			// return this.data.subjects.join(', ')
			return this.data.subjects
		},
		crimeList() {
			const descriptionList = this.data.description
				.split(';')
				.join(',')
				.split(':')
				.join(',')
				.split(',')
			return descriptionList
		},
		aliasList() {
			if (this.data.aliases) {
				return this.data.aliases.join(', ')
			} else {
				return 'NA'
			}
		},
	},
	methods: {
		isVictim() {
			// it appears like all missing people and victims have the details node
			if (this.data.details) return true
			else return false
		},
	},
	mounted() {
		console.log(this.imageList)
	},
}
</script>

<style scoped>
.box {
	flex-grow: 1;

	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
}

.box p {
	margin-bottom: 0;
}

.featuredImage {
	border: 2px solid black;
}

.extraImage {
	/* max-width: 20%; */
	height: auto;
}
</style>