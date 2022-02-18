<template>
	<div>
		<div class="mb-2 d-flex">
			<input
				class="p-2 flex-fill"
				:value="search"
				type="search"
				placeholder="Search the most wanted"
				aria-label="Search the most wanted"
				@input="handleSearch"
			/>
		</div>
		<div class="mb-4 w-full">
			<div class="">
				<button
					class="px-2 m-1"
					:class="{ pressed: status === 'all' }"
					@click="handleStatusFilter(['all'])"
				>
					All
				</button>
				<button
					v-for="(category, index) in categories"
					:key="index"
					class="px-2 m-1"
					:class="{
						pressed: status === `${category.subjects[0]}`,
					}"
					@click="handleStatusFilter(category.subjects)"
				>
					{{ category.title }}
				</button>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="relative mb-3">
				<p
					class="text-gray-700 cursor-pointer flex items-center"
					@click="orderOpen = !orderOpen"
				>
					<span>&#8597;</span>
					<span class="mr-1">Order By</span>
					<span v-show="orderChanged" class="font-semibold">
						{{ orderText }}</span
					>
				</p>
				<ul v-show="orderOpen" class="px-3 py-2">
					<li
						:class="{ pressed: order === 'createdAt' }"
						@click="handleFilterOrder('createdAt')"
					>
						Date Published
					</li>
					<li
						:class="{
							pressed: order === 'rewardSize',
						}"
						@click="handleFilterOrder('rewardSize')"
					>
						Reward Value
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<script>
import { debounce } from '~/assets/js/utils.js'

export default {
	data() {
		return {
			orderOpen: false,
			orderChanged: false,
			categories: [
				{
					title: 'Minors',
					subjects: [
						'Crimes Against Children',
						'Kidnappings and Missing Persons',
						'Parental Kidnapping',
						'ECAP',
						'Endangered Child Alert Program',
						'Parental Kidnapping Victim',
					],
				},
				{
					title: 'ViCAP',
					subjects: [
						'ViCAP Missing Persons',
						'ViCAP Unidentified Persons',
						'ViCAP Homicides and Sexual Assaults',
						'VICAP Missing Persons',
					],
				},
				{
					title: 'Criminal Enterprise Investigations',
					subjects: [
						'Criminal Enterprise Investigations',
						'Criminal Enterprise Investiagtions',
					],
				},
				{
					title: 'Capitol',
					subjects: ['Capitol'],
				},
				{
					title: 'Ten Most Wanted Fugitives',
					subjects: ['Ten Most Wanted Fugitives'],
				},
				{
					title: 'Indian Country',
					subjects: ['Indian Country'],
				},
				{
					title: 'Terrorism',
					subjects: [
						// 'Seeking Information - Terrorism',
						' - Terrorism',
						'Domestic Terrorism',
						'Most Wanted Terrorists',
					],
				},
				{
					title: 'Violent Crime',
					subjects: [
						'Violent Crime - Murders',
						'Additional Violent Crimes',
						'Operation Legend',
					],
				},
				{
					title: 'Cyber Crimes',
					subjects: ["Cyber's Most Wanted"],
				},
				{
					title: 'Counter Intelegence',
					subjects: ['Counterintelligence'],
				},
				{
					title: 'White Colar Crime',
					subjects: ['White-Collar Crime'],
				},
				{
					title: 'Seeking Information',
					subjects: [
						'law enforcement assistance',
						'Law Enforcement Assistance',
						'Seeking Information',
					],
				},
				{
					title: 'Known Bank Robbers',
					subjects: ['Known Bank Robbers'],
				},
				{
					title: 'Human Trafficking',
					subjects: ['Human Trafficking'],
				},
				{
					title: 'Misc',
					subjects: [
						'Chloe Combe-Rivas',
						'Michael Reyes',
						'Jesus Aguilar, Jr.',
						'Karen Aguilar',
						'William Martin Vosseler',
						'Vosseler',
						'Mendoza',
					],
				},
			],
		}
	},
	computed: {
		search() {
			return this.$store.state.filter.search
		},
		status() {
			return this.$store.state.filter.status[0]
		},
		order() {
			return this.$store.state.filter.order
		},
		orderText() {
			switch (this.order) {
				case 'companyName':
					return 'Company Name'
				case 'jobTitle':
					return 'Job Title'
				case 'status':
					return 'Status'
				default:
					return 'Created Date'
			}
		},
	},
	methods: {
		handleStatusFilter(status) {
			this.$store.dispatch('filterStatus', status)
		},
		handleSearch: debounce(function (e) {
			this.$store.dispatch('filterSearch', e.target.value)
		}, 500),
		handleFilterOrder(orderBy) {
			this.orderOpen = false
			this.orderChanged = true
			this.$store.dispatch('filterOrder', orderBy)
		},
		closeOrderDropDown(e) {
			this.orderOpen = false
		},
	},
}
</script>

<style scoped>
label {
	font-weight: 500;
}

.box {
	flex-grow: 1;
	padding: 1rem;
	border: 2px solid black;
	min-width: 33%;
	background: var(--color-bg);
}

.pressed {
	/* background: var(--bs-blue); */
	background: blue;
	color: white;
}
</style>